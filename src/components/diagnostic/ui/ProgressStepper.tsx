import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface ProgressStepperProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
}

export function ProgressStepper({
  currentStep,
  totalSteps,
  labels = ['Contexte', 'Questions', 'Coordonnées', 'Résultats'],
}: ProgressStepperProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, i) => {
          const stepNum = i + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <div key={i} className="flex items-center flex-1 last:flex-none">
              {/* Step circle */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors',
                    isCompleted && 'bg-primary text-white',
                    isCurrent && 'bg-primary text-white ring-4 ring-primary-light',
                    !isCompleted && !isCurrent && 'bg-border text-muted'
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    stepNum
                  )}
                </div>
                {labels[i] && (
                  <span
                    className={cn(
                      'mt-2 text-xs font-medium hidden sm:block',
                      (isCompleted || isCurrent) ? 'text-foreground' : 'text-muted'
                    )}
                  >
                    {labels[i]}
                  </span>
                )}
              </div>

              {/* Connector line */}
              {i < totalSteps - 1 && (
                <div className="flex-1 mx-2 sm:mx-4">
                  <div
                    className={cn(
                      'h-1 rounded-full transition-colors',
                      stepNum < currentStep ? 'bg-primary' : 'bg-border'
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Simple progress bar alternative
export interface ProgressBarProps {
  progress: number;
  showLabel?: boolean;
}

export function ProgressBar({ progress, showLabel = false }: ProgressBarProps) {
  return (
    <div className="w-full">
      <div className="h-2 bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-xs text-muted mt-1 text-right">{Math.round(progress)}%</p>
      )}
    </div>
  );
}
