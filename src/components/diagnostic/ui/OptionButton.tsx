import { cn } from '@/lib/utils';
import { Check, AlertTriangle, AlertCircle } from 'lucide-react';
import type { QuestionOption } from '@/types/diagnostic';

export interface OptionButtonProps {
  option: QuestionOption;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}

export function OptionButton({ option, index, isSelected, onSelect }: OptionButtonProps) {
  const letters = ['A', 'B', 'C', 'D', 'E'];
  const letter = letters[index] || String(index + 1);

  const getIndicatorIcon = () => {
    switch (option.indicator) {
      case 'optimal':
        return <Check className="w-4 h-4 text-success" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      case 'critical':
        return <AlertCircle className="w-4 h-4 text-danger" />;
      default:
        return null;
    }
  };

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'w-full text-left p-4 rounded-xl border-2 transition-all duration-200',
        'hover:border-primary/50 hover:shadow-md',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        isSelected
          ? 'border-primary bg-primary-light shadow-md'
          : 'border-border bg-white'
      )}
    >
      <div className="flex items-start gap-3">
        {/* Letter indicator */}
        <div
          className={cn(
            'flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold transition-colors',
            isSelected
              ? 'bg-primary text-white'
              : 'bg-background text-muted'
          )}
        >
          {letter}
        </div>

        {/* Option text */}
        <div className="flex-1 min-w-0">
          <p className={cn(
            'text-base leading-relaxed',
            isSelected ? 'text-foreground font-medium' : 'text-foreground'
          )}>
            {option.text}
          </p>

          {/* Feedback (shown when selected) */}
          {isSelected && option.feedback && (
            <p className="mt-2 text-sm text-muted italic">
              {option.feedback}
            </p>
          )}
        </div>

        {/* Indicator icon */}
        {option.indicator && (
          <div className="flex-shrink-0">
            {getIndicatorIcon()}
          </div>
        )}
      </div>
    </button>
  );
}
