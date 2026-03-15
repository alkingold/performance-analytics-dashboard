import { GraphConfig } from '@/features/dashboard/config/graphs';
import { MetricRow } from '@/features/dashboard/types/dashboard';
import CustomTooltip from '@/shared/components/CustomTooltip';
import { METRICS } from '@/shared/config/metrics';
import { minMaxRange } from '@/shared/utils/maths';
import { useMemo } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type LineGraphProps = {
  graphConfig: GraphConfig;
  data: MetricRow[];
};

function LineGraph({ graphConfig, data }: LineGraphProps) {
  const isMultiAxis = useMemo(() => {
    const firstUnit = METRICS[graphConfig.metrics[0]].unit;

    return graphConfig.metrics.some(
      (metric) => METRICS[metric].unit !== firstUnit,
    );
  }, [graphConfig.metrics]);

  const yAxes = isMultiAxis ? (
    graphConfig.metrics.map((metric, index) => (
      <YAxis
        key={metric}
        yAxisId={metric}
        orientation={index === 0 ? 'left' : 'right'}
        width="auto"
        domain={minMaxRange}
        tickFormatter={METRICS[metric].formatter}
        label={{
          value: METRICS[metric].unit,
          position: index === 0 ? 'insideTopLeft' : 'insideTopRight',
        }}
      />
    ))
  ) : (
    <YAxis
      yAxisId="main"
      width="auto"
      tickFormatter={METRICS[graphConfig.metrics[0]].formatter}
      label={{
        value: METRICS[graphConfig.metrics[0]].unit,
        position: 'insideTopLeft',
      }}
    />
  );

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />

        {yAxes}

        <Tooltip content={CustomTooltip} />
        <Legend />

        {graphConfig.metrics.map((metric) => (
          <Line
            key={`${metric}-line`}
            yAxisId={isMultiAxis ? metric : 'main'}
            type="monotone"
            stroke={METRICS[metric].color}
            strokeWidth={1}
            dot={true}
            dataKey={metric}
            name={METRICS[metric].label}
            activeDot={{ r: 8 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

export default LineGraph;
