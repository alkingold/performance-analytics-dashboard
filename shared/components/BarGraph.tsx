'use client';

import { GraphConfig } from '@/features/dashboard/config/graphs';
import { MetricRow } from '@/features/dashboard/types/dashboard';
import CustomTooltip from '@/shared/components/CustomTooltip';
import { MetricKey, METRICS } from '@/shared/config/metrics';
import { absMaxFromValues } from '@/shared/utils/maths';
import { useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type BarGraphProps = {
  graphConfig: GraphConfig;
  data: MetricRow[];
};

function BarGraph({ graphConfig, data }: BarGraphProps) {
  const lastEntry = [
    {
      name: 'Metrics ',
      ...data[data.length - 1],
    },
  ];

  const isMultiAxis = useMemo(() => {
    const firstUnit = METRICS[graphConfig.metrics[0]].unit;

    return graphConfig.metrics.some(
      (metric) => METRICS[metric].unit !== firstUnit,
    );
  }, [graphConfig.metrics]);

  const customTicks = (metric?: MetricKey): number[] => {
    const generatedTicks: number[] = [];
    let value = 0;
    let step = 0;

    if (metric) {
      // logic for multi axis charts for every given metric
      value = lastEntry[0][metric];
      step = METRICS[metric].step;
    } else {
      // logic for single axis charts (find min and max values)
      const values = graphConfig.metrics.map((metric) => lastEntry[0][metric]);
      value = absMaxFromValues(values);
      step = METRICS[graphConfig.metrics[0]].step;
    }

    const end = Math.ceil(Math.abs(value) / step) * step;
    const start = -end;
    for (let i = start; i <= end; i += step) {
      generatedTicks.push(i);
    }

    return generatedTicks;
  };

  const xAxes = isMultiAxis ? (
    graphConfig.metrics.map((metric, index) => (
      <XAxis
        key={`${metric}-axis`}
        type="number"
        xAxisId={metric}
        orientation={index === 0 ? 'bottom' : 'top'}
        height={45}
        tickFormatter={METRICS[metric].formatter}
        ticks={customTicks(metric)}
        label={{
          value: METRICS[metric].label,
          position: index === 0 ? 'insideBottomRight' : 'insideTopRight',
        }}
      />
    ))
  ) : (
    <XAxis
      type="number"
      xAxisId="main"
      height={45}
      tickFormatter={METRICS[graphConfig.metrics[0]].formatter}
      ticks={customTicks()}
      label={{
        value: METRICS[graphConfig.metrics[0]].label,
        position: 'insideBottomRight',
      }}
    />
  );

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart
        layout="vertical"
        data={lastEntry}
        margin={{
          top: 30,
          bottom: 30,
          left: 20,
          right: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <YAxis type="category" dataKey="name" />

        {xAxes}

        <Tooltip content={CustomTooltip} />
        <Legend />

        {graphConfig.metrics.reverse().map((metric) => (
          <Bar
            key={`${metric}-bar`}
            dataKey={metric}
            xAxisId={isMultiAxis ? metric : 'main'}
            fill={METRICS[metric].color}
            name={METRICS[metric].label}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

export default BarGraph;
