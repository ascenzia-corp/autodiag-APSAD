import {
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import type { AxisScore } from '@/types/diagnostic';

export interface SecurityRadarChartProps {
  data: AxisScore[];
  blur?: boolean;
}

export function SecurityRadarChart({ data, blur = false }: SecurityRadarChartProps) {
  // percentage: 100% = conforme (best), 0% = critique (worst)
  const chartData = data.map((d) => ({
    axis: d.axis,
    value: d.percentage,
    fullMark: 100,
  }));

  return (
    <div className={blur ? 'filter blur-sm' : ''}>
      <ResponsiveContainer width="100%" height={350}>
        <RechartsRadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
          <PolarGrid gridType="polygon" stroke="#e2e8f0" />
          <PolarAngleAxis
            dataKey="axis"
            tick={{ fill: '#64748b', fontSize: 12 }}
            tickLine={false}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: '#94a3b8', fontSize: 10 }}
            tickCount={5}
            axisLine={false}
          />
          {/* Target zone (100% = ideal) */}
          <Radar
            name="Zone cible"
            dataKey="fullMark"
            stroke="none"
            fill="#dcfce7"
            fillOpacity={0.4}
          />
          {/* User score */}
          <Radar
            name="Votre score"
            dataKey="value"
            stroke="#2D8B4E"
            fill="#2D8B4E"
            fillOpacity={0.5}
            strokeWidth={2}
            dot={{ fill: '#2D8B4E', r: 4, strokeWidth: 0 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '8px 12px',
            }}
            formatter={(value) => [`${value}%`, 'Conformité']}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Legend component
export function RadarChartLegend() {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-success" />
        <span className="text-muted">80-100% : Conforme</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-info" />
        <span className="text-muted">55-79% : À surveiller</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-warning" />
        <span className="text-muted">30-54% : Significatif</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-danger" />
        <span className="text-muted">0-29% : Critique</span>
      </div>
    </div>
  );
}
