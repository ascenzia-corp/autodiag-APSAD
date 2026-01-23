import { cn } from '@/lib/utils';
import { AlertCircle, Info, ChevronRight } from 'lucide-react';
import type { Recommendation } from '@/types/diagnostic';

export interface RecommendationItemProps {
  recommendation: Recommendation;
  index: number;
}

export function RecommendationItem({ recommendation, index }: RecommendationItemProps) {
  const getPriorityStyles = () => {
    switch (recommendation.priority) {
      case 1:
        return {
          icon: AlertCircle,
          iconColor: 'text-danger',
          bgColor: 'bg-danger-light',
          label: 'Prioritaire',
        };
      case 2:
        return {
          icon: Info,
          iconColor: 'text-warning',
          bgColor: 'bg-warning-light',
          label: 'Important',
        };
      default:
        return {
          icon: Info,
          iconColor: 'text-info',
          bgColor: 'bg-info-light',
          label: 'Recommandé',
        };
    }
  };

  const { icon: Icon, iconColor, bgColor, label } = getPriorityStyles();

  return (
    <div
      className={cn(
        'flex items-start gap-4 p-4 rounded-lg border border-border bg-white',
        'hover:shadow-md transition-shadow'
      )}
    >
      {/* Priority indicator */}
      <div
        className={cn(
          'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
          bgColor
        )}
      >
        <span className="text-sm font-bold text-foreground">{index + 1}</span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Icon className={cn('w-4 h-4', iconColor)} />
          <span className={cn('text-xs font-medium uppercase', iconColor)}>{label}</span>
        </div>
        <p className="text-foreground leading-relaxed">{recommendation.text}</p>
        {recommendation.apsadRef && (
          <p className="mt-1 text-xs text-muted">Réf. APSAD : {recommendation.apsadRef}</p>
        )}
      </div>

      {/* Arrow */}
      <ChevronRight className="flex-shrink-0 w-5 h-5 text-muted" />
    </div>
  );
}

export interface RecommendationListProps {
  recommendations: Recommendation[];
}

export function RecommendationList({ recommendations }: RecommendationListProps) {
  if (recommendations.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-12 h-12 rounded-full bg-success-light flex items-center justify-center mx-auto mb-3">
          <svg
            className="w-6 h-6 text-success"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <p className="text-foreground font-medium">Excellent !</p>
        <p className="text-sm text-muted mt-1">
          Aucune recommandation prioritaire identifiée.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {recommendations.map((rec, index) => (
        <RecommendationItem key={rec.id} recommendation={rec} index={index} />
      ))}
    </div>
  );
}
