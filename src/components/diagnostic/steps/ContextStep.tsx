import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Building2 } from 'lucide-react';
import { Button, Card, Select } from '../ui';
import { contextQuestions } from '@/data/questions';
import type { UserContext } from '@/types/diagnostic';

export interface ContextStepProps {
  initialContext: UserContext;
  onSubmit: (context: UserContext) => void;
}

export function ContextStep({ initialContext, onSubmit }: ContextStepProps) {
  const [context, setContext] = useState<UserContext>(initialContext);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (id: string, value: string) => {
    setContext((prev) => ({ ...prev, [id]: value }));
    // Clear error when user makes a selection
    if (errors[id]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    const newErrors: Record<string, string> = {};
    contextQuestions.forEach((q) => {
      if (q.required && !context[q.id as keyof UserContext]) {
        newErrors[q.id] = 'Ce champ est requis';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(context);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="py-8 sm:py-12"
    >
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-7 h-7 text-primary" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Quelques informations sur votre site
          </h2>
          <p className="text-muted">
            Ces informations nous permettent de personnaliser vos résultats.
          </p>
        </div>

        {/* Form */}
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            {contextQuestions.map((question) => (
              <div key={question.id}>
                <Select
                  label={question.label}
                  required={question.required}
                  value={context[question.id as keyof UserContext] || ''}
                  onChange={(e) => handleChange(question.id, e.target.value)}
                  options={question.options.map((opt) => ({
                    value: opt.value,
                    label: opt.label,
                  }))}
                  error={errors[question.id]}
                />
                {question.helpText && (
                  <p className="mt-1 text-xs text-muted">{question.helpText}</p>
                )}
              </div>
            ))}

            <div className="pt-4">
              <Button type="submit" size="lg" className="w-full">
                Continuer vers les questions
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </form>
        </Card>

        {/* Note */}
        <p className="text-center text-xs text-muted mt-6">
          Ces informations ne sont pas utilisées dans le calcul du score.
        </p>
      </div>
    </motion.div>
  );
}
