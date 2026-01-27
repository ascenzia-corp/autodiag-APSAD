import { cn } from '@/lib/utils';
import { Target, Radio, Zap, Wrench, FileText } from 'lucide-react';
import type { AxisScore } from '@/types/diagnostic';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Risque: Target,
  Couverture: Radio,
  Performance: Zap,
  Maintenance: Wrench,
  Documentation: FileText,
};

export interface AxisScoreCardProps {
  axisScore: AxisScore;
}

export function AxisScoreCard({ axisScore }: AxisScoreCardProps) {
  const { axis, percentage } = axisScore;
  const Icon = iconMap[axis] || Target;

  // High percentage = good (green), low percentage = bad (red)
  const getColorClass = () => {
    if (percentage >= 80) return 'text-success bg-success-light';
    if (percentage >= 55) return 'text-info bg-info-light';
    if (percentage >= 30) return 'text-warning bg-warning-light';
    return 'text-danger bg-danger-light';
  };

  const getProgressColor = () => {
    if (percentage >= 80) return 'bg-success';
    if (percentage >= 55) return 'bg-info';
    if (percentage >= 30) return 'bg-warning';
    return 'bg-danger';
  };

  return (
    <div className="flex items-center gap-4 p-4 rounded-lg bg-background">
      {/* Icon */}
      <div
        className={cn(
          'flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center',
          getColorClass()
        )}
      >
        <Icon className="w-5 h-5" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="font-medium text-foreground">{axis}</span>
          <span className="text-sm tabular-nums text-muted">
            {percentage}%
          </span>
        </div>
        {/* Progress bar */}
        <div className="h-2 bg-border rounded-full overflow-hidden">
          <div
            className={cn('h-full rounded-full transition-all duration-500', getProgressColor())}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export interface AxisScoreListProps {
  axisScores: AxisScore[];
}

export function AxisScoreList({ axisScores }: AxisScoreListProps) {
  return (
    <div className="space-y-3">
      {axisScores.map((axisScore) => (
        <AxisScoreCard key={axisScore.axis} axisScore={axisScore} />
      ))}
    </div>
  );
}
