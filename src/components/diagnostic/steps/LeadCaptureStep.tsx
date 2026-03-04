import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Card, Input, Select, Checkbox } from '../ui';
import { SecurityRadarChart } from '../ui/RadarChart';
import { submitToHubSpot } from '@/lib/hubspot';
import type { LeadData, AxisScore, UserContext, ScoreLevel } from '@/types/diagnostic';

const leadSchema = z.object({
  firstName: z.string().min(2, 'Prénom requis'),
  lastName: z.string().min(2, 'Nom requis'),
  email: z
    .string()
    .email('Email invalide')
    .refine(
      (email) =>
        !email.endsWith('@gmail.com') &&
        !email.endsWith('@hotmail.com') &&
        !email.endsWith('@yahoo.com') &&
        !email.endsWith('@outlook.com'),
      'Merci d\'utiliser votre email professionnel'
    ),
  phone: z.string().optional(),
  company: z.string().min(2, 'Entreprise requise'),
  jobTitle: z.string().min(1, 'Fonction requise'),
  wantsCallback: z.boolean(),
  rgpdConsent: z.boolean().refine((val) => val === true, {
    message: 'Vous devez accepter la politique de traitement des données',
  }),
});

type LeadFormData = z.infer<typeof leadSchema>;

const jobTitleOptions = [
  { value: 'dirigeant', label: 'Dirigeant / Direction générale' },
  { value: 'securite', label: 'Responsable sécurité / sûreté' },
  { value: 'facility', label: 'Facility Manager / Services généraux' },
  { value: 'technique', label: 'Responsable technique / maintenance' },
  { value: 'daf', label: 'DAF / Direction administrative' },
  { value: 'autre', label: 'Autre' },
];

export interface LeadCaptureStepProps {
  previewData: AxisScore[];
  diagnosticScore: number;
  scoreLevel: ScoreLevel;
  context: UserContext;
  onSubmit: (data: LeadData) => void;
  onSkip?: () => void;
}

export function LeadCaptureStep({
  previewData,
  diagnosticScore,
  scoreLevel,
  context,
  onSubmit,
  onSkip,
}: LeadCaptureStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      wantsCallback: true,
    },
  });

  const onFormSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Submit to HubSpot
      const hubspotSuccess = await submitToHubSpot({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        company: data.company,
        jobTitle: data.jobTitle,
        wantsCallback: data.wantsCallback,
        diagnosticScore: diagnosticScore,
        diagnosticLevel: scoreLevel.label,
        siteArea: context.siteArea,
        sector: context.sector,
        mainConcern: context.mainConcern,
      });

      if (!hubspotSuccess) {
        console.warn('HubSpot submission failed, but continuing to results');
      }

      // Always proceed to results, even if HubSpot fails
      onSubmit(data);
    } catch (error) {
      console.error('Form submission error:', error);
      // Still proceed to results
      onSubmit(data);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="py-8 sm:py-12"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Blurred preview */}
          <div className="hidden lg:block relative">
            <div className="sticky top-24">
              <Card className="overflow-hidden">
                <div className="text-center mb-4">
                  <div className="text-5xl font-bold text-foreground/20 blur-sm tabular-nums">
                    ??/100
                  </div>
                </div>
                <SecurityRadarChart data={previewData} blur />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent flex items-end justify-center pb-8">
                  <p className="text-sm text-muted">
                    Remplissez le formulaire pour voir vos résultats
                  </p>
                </div>
              </Card>
            </div>
          </div>

          {/* Form */}
          <div>
            <Card>
              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-full bg-success-light flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-7 h-7 text-success" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Votre diagnostic est prêt !
                </h2>
                <p className="text-muted">
                  Renseignez vos coordonnées pour accéder à vos résultats détaillés
                  et recevoir votre rapport personnalisé par email.
                </p>
              </div>

              <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Prénom"
                    required
                    {...register('firstName')}
                    error={errors.firstName?.message}
                  />
                  <Input
                    label="Nom"
                    required
                    {...register('lastName')}
                    error={errors.lastName?.message}
                  />
                </div>

                <Input
                  label="Email professionnel"
                  type="email"
                  required
                  {...register('email')}
                  error={errors.email?.message}
                />

                <Input
                  label="Téléphone"
                  type="tel"
                  {...register('phone')}
                  error={errors.phone?.message}
                />

                <Input
                  label="Entreprise"
                  required
                  {...register('company')}
                  error={errors.company?.message}
                />

                <Select
                  label="Votre fonction"
                  required
                  options={jobTitleOptions}
                  value={watch('jobTitle') || ''}
                  onChange={(e) => setValue('jobTitle', e.target.value)}
                  error={errors.jobTitle?.message}
                />

                <div className="pt-2">
                  <Checkbox
                    label="Je souhaite être recontacté pour approfondir ce diagnostic"
                    {...register('wantsCallback')}
                    defaultChecked
                  />
                </div>

                <div className="pt-2">
                  <Checkbox
                    label={
                      <>
                        J'accepte que mes données personnelles, notamment mon adresse email,
                        soient exploitées par Groupe PERIN Sécurité afin d'être contacté(e).
                        Je confirme avoir pris connaissance de mes droits d'accès, de rectification,
                        d'effacement, de limitation et d'opposition concernant les données me
                        concernant, conformément à l'article 34 de la loi « Informatique et
                        Libertés » du 6 janvier 1978 modifiée et au Règlement (UE) 2016/679 du
                        27 avril 2016 (RGPD), applicable depuis le 25 mai 2018. Pour exercer
                        ces droits, je peux contacter :{' '}
                        <a
                          href="mailto:securite@perin.fr"
                          className="text-primary underline hover:text-primary/80"
                          onClick={(e) => e.stopPropagation()}
                        >
                          securite@perin.fr
                        </a>
                      </>
                    }
                    {...register('rgpdConsent')}
                  />
                  {errors.rgpdConsent && (
                    <p className="text-sm text-danger mt-1 ml-8">
                      {errors.rgpdConsent.message}
                    </p>
                  )}
                </div>

                {submitError && (
                  <p className="text-sm text-danger">{submitError}</p>
                )}

                <div className="pt-4">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Envoi en cours...' : 'Voir mes résultats détaillés'}
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </form>
            </Card>

            {/* Skip option (optional) */}
            {onSkip && (
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={onSkip}
                  className="text-sm text-muted hover:text-foreground underline"
                >
                  Voir les résultats sans renseigner mes coordonnées
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
