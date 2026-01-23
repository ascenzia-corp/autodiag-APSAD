import { ProgressBar } from '../ui/ProgressStepper';

export interface DiagnosticHeaderProps {
  progress: number;
  showProgress?: boolean;
}

export function DiagnosticHeader({ progress, showProgress = true }: DiagnosticHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <img
            src="/logo-perin.svg"
            alt="Groupe Perin Sécurité"
            className="h-10 w-auto"
          />

          {/* Right side - can add info or menu */}
          <div className="text-sm text-muted">
            Autodiagnostic APSAD
          </div>
        </div>

        {/* Progress bar */}
        {showProgress && (
          <div className="pb-3">
            <ProgressBar progress={progress} />
          </div>
        )}
      </div>
    </header>
  );
}
