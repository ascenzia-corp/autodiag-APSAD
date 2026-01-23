import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Lock, ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Card, Input, Select, Checkbox } from '../ui';
import { SecurityRadarChart } from '../ui/RadarChart';
import type { LeadData, AxisScore } from '@/types/diagnostic';

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
  onSubmit: (data: LeadData) => void;
  onSkip?: () => void;
}

export function LeadCaptureStep({ previewData, onSubmit, onSkip }: LeadCaptureStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    onSubmit(data);
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

                <div className="pt-4">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Chargement...' : 'Voir mes résultats détaillés'}
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </form>

              {/* Privacy note */}
              <div className="flex items-start gap-2 mt-6 p-3 rounded-lg bg-background">
                <Lock className="w-4 h-4 text-muted flex-shrink-0 mt-0.5" />
                <p className="text-xs text-muted">
                  Vos données sont protégées et ne seront jamais revendues.
                  Vous pouvez vous désinscrire à tout moment.
                </p>
              </div>
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
