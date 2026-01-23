import { cn } from '@/lib/utils';
import type { ScoreLevel } from '@/types/diagnostic';

export interface ScoreGaugeProps {
  score: number;
  max?: number;
  level: ScoreLevel;
  size?: 'sm' | 'md' | 'lg';
}

export function ScoreGauge({ score, max = 100, level, size = 'md' }: ScoreGaugeProps) {
  const percentage = Math.min((score / max) * 100, 100);

  // Calculate stroke dash for the circle
  const radius = size === 'sm' ? 40 : size === 'md' ? 60 : 80;
  const strokeWidth = size === 'sm' ? 6 : size === 'md' ? 8 : 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getColorClass = () => {
    switch (level.color) {
      case 'success':
        return 'stroke-success';
      case 'info':
        return 'stroke-info';
      case 'warning':
        return 'stroke-warning';
      case 'danger':
        return 'stroke-danger';
      default:
        return 'stroke-muted';
    }
  };

  const svgSize = radius * 2 + strokeWidth * 2;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: svgSize, height: svgSize }}>
        <svg
          width={svgSize}
          height={svgSize}
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            fill="none"
            className={cn(getColorClass(), 'transition-all duration-1000 ease-out')}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={cn(
              'font-bold tabular-nums',
              size === 'sm' && 'text-xl',
              size === 'md' && 'text-3xl',
              size === 'lg' && 'text-4xl'
            )}
          >
            {score}
          </span>
          <span className="text-sm text-muted">/ {max}</span>
        </div>
      </div>
    </div>
  );
}
