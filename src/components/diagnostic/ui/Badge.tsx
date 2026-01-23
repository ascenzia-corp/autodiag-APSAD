import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'info' | 'warning' | 'danger' | 'outline';
  children: ReactNode;
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variant === 'default' && 'bg-primary-light text-primary',
        variant === 'success' && 'bg-success-light text-success',
        variant === 'info' && 'bg-info-light text-info',
        variant === 'warning' && 'bg-warning-light text-warning',
        variant === 'danger' && 'bg-danger-light text-danger',
        variant === 'outline' && 'border border-border text-muted bg-white',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
