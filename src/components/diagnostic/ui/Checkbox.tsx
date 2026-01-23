import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    const checkboxId = id || label.toLowerCase().replace(/\s+/g, '-');

    return (
      <label
        htmlFor={checkboxId}
        className={cn(
          'flex items-start gap-3 cursor-pointer group',
          props.disabled && 'cursor-not-allowed opacity-50',
          className
        )}
      >
        <div className="relative flex-shrink-0 mt-0.5">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(
              'w-5 h-5 rounded border-2 border-input bg-white transition-colors',
              'peer-checked:bg-primary peer-checked:border-primary',
              'peer-focus:ring-2 peer-focus:ring-primary peer-focus:ring-offset-2',
              'group-hover:border-primary/50'
            )}
          />
          <Check
            className={cn(
              'absolute top-0.5 left-0.5 w-4 h-4 text-white opacity-0 transition-opacity',
              'peer-checked:opacity-100'
            )}
          />
        </div>
        <span className="text-sm text-foreground leading-relaxed">{label}</span>
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
