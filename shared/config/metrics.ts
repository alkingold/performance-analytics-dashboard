import { formatToKilo, formatToPercent } from '@/shared/utils/maths';

export const METRICS = {
  performance_index: {
    label: 'Performance Index',
    unit: '€',
    formatter: (v: number) => `${formatToKilo(v)}k`,
    color: '#4f46e5',
    step: 500,
  },
  efficiency_ratio: {
    label: 'Efficiency Ratio',
    unit: '%',
    formatter: (v: number) => `${formatToPercent(v)}%`,
    color: '#0d9488',
    step: 0.01,
  },
  growth_rate: {
    label: 'Growth Rate',
    unit: '%',
    formatter: (v: number) => `${formatToPercent(v)}%`,
    color: '#f43f5e',
    step: 0.01,
  } as const,
};

export type MetricKey = keyof typeof METRICS;
