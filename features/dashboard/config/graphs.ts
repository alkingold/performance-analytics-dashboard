import { MetricKey } from '@/shared/config/metrics';

export const GRAPH_KEYS = {
  PERF_EFF_HIST: 'perf_eff_hist',
  PERF_EFF_SPOT: 'perf_eff_spot',
  GROWTH_EFF_HIST: 'growth_eff_hist',
  GROWTH_EFF_SPOT: 'growth_eff_spot',
  PERF_GROWTH_HIST: 'perf_growth_hist',
  PERF_GROWTH_SPOT: 'perf_growth_spot',
} as const;

export type GraphKey = (typeof GRAPH_KEYS)[keyof typeof GRAPH_KEYS];

export type GraphConfig = {
  label: string;
  description: string;
  metrics: MetricKey[];
  mode: 'history' | 'spot';
  type: 'line' | 'bar';
};

export const GRAPHS: Record<GraphKey, GraphConfig> = {
  perf_eff_hist: {
    label: 'Performance index to efficiency ratio History',
    description:
      'Tracks the historical evolution of performance index compared to the efficiency ratio percentage over time.',
    metrics: ['performance_index', 'efficiency_ratio'],
    mode: 'history',
    type: 'line',
  },
  perf_eff_spot: {
    label: 'Performance index to efficiency ratio Spot',
    description:
      'Displays the latest snapshot comparison between performance index and efficiency ratio percentage.',
    metrics: ['performance_index', 'efficiency_ratio'],
    mode: 'spot',
    type: 'bar',
  },
  growth_eff_hist: {
    label: 'Growth rate to efficiency ratio History',
    description:
      'Tracks the historical evolution of growth rate compared to the efficiency ratio percentage over time.',
    metrics: ['growth_rate', 'efficiency_ratio'],
    mode: 'history',
    type: 'line',
  },
  growth_eff_spot: {
    label: 'Growth rate to efficiency ratio Spot',
    description:
      'Displays the latest snapshot comparison between growth rate and efficiency ratio percentage.',
    metrics: ['growth_rate', 'efficiency_ratio'],
    mode: 'spot',
    type: 'bar',
  },
  perf_growth_hist: {
    label: 'Performance index to growth rate History',
    description:
      'Tracks the historical evolution of performance index compared to the growth rate percentage over time.',
    metrics: ['performance_index', 'growth_rate'],
    mode: 'history',
    type: 'line',
  },
  perf_growth_spot: {
    label: 'Performance index to growth rate Spot',
    description:
      'Displays the latest snapshot comparison between performance index and growth rate percentage.',
    metrics: ['performance_index', 'growth_rate'],
    mode: 'spot',
    type: 'bar',
  },
};
