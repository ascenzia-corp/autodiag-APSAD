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
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {/* Simplified Perin logo representation */}
              <div className="flex items-center gap-1">
                <div className="w-8 h-8 bg-primary rounded-r-full" />
                <div className="flex flex-col leading-none">
                  <span className="text-xs font-bold text-muted tracking-wider">GROUPE</span>
                  <span className="text-lg font-bold text-foreground tracking-tight">PERIN</span>
                </div>
              </div>
            </div>
            <span className="hidden sm:inline-block text-xs font-semibold text-primary uppercase tracking-wide ml-2">
              Sécurité
            </span>
          </div>

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
