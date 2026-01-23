import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

export interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({ icon: Icon, title, description, className }: FeatureCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center text-center p-6 rounded-xl bg-white border border-border',
        'hover:shadow-md hover:border-primary/30 transition-all',
        className
      )}
    >
      <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted">{description}</p>
    </div>
  );
}

export interface CTACardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText: string;
  buttonVariant?: 'primary' | 'outline';
  onClick?: () => void;
  href?: string;
}

export function CTACard({
  icon: Icon,
  title,
  description,
  buttonText,
  buttonVariant = 'primary',
  onClick,
  href,
}: CTACardProps) {
  const ButtonOrLink = href ? 'a' : 'button';
  const buttonProps = href
    ? { href, target: '_blank', rel: 'noopener noreferrer' }
    : { onClick };

  return (
    <div className="flex flex-col p-6 rounded-xl bg-white border border-border">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
      <p className="text-sm text-muted mb-4 flex-1">{description}</p>
      <ButtonOrLink
        className={cn(
          'inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all text-center',
          buttonVariant === 'primary' &&
            'bg-primary text-white hover:bg-primary-dark',
          buttonVariant === 'outline' &&
            'border-2 border-border bg-white text-foreground hover:bg-background'
        )}
        {...buttonProps}
      >
        {buttonText}
      </ButtonOrLink>
    </div>
  );
}
