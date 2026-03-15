import { MetricRow } from '@/features/dashboard/types/dashboard';
import { MetricKey, METRICS } from '@/shared/config/metrics';
import { formatToPercent } from '@/shared/utils/maths';
import { TooltipContentProps } from 'recharts';
import {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';

type TooltipPayload = {
  value: number;
  name: string;
  color: string;
  dataKey: MetricKey;
  payload: MetricRow;
};

function CustomTooltip({
  active,
  payload,
  label,
}: TooltipContentProps<ValueType, NameType>) {
  if (!active || !payload || payload.length === 0) return null;

  // Transform Recharts payload into TooltipPayload
  const transformedPayload = payload.map((entry) => {
    const dataKey = entry.dataKey as MetricKey;
    const value = entry.value as number;
    const color = entry.color || '#000';
    const name = entry.name as string;
    const metricPayload = entry.payload as MetricRow;

    return {
      value,
      name,
      color,
      dataKey,
      payload: metricPayload,
    };
  });

  const normalizedMetricValue = (entry: TooltipPayload): string => {
    const metricKey = entry.dataKey;

    switch (METRICS[metricKey].unit) {
      case '%':
        return `${formatToPercent(entry.value)} %`;
      case '€':
        return `${entry.value} €`;
      default:
        return entry.value.toString();
    }
  };

  return (
    <div className="rounded bg-white shadow p-2 opacity-90">
      <p>{label}:</p>
      {transformedPayload.map((entry) => {
        return (
          <p key={entry.dataKey} style={{ color: entry.color }}>
            <span>{entry.name}</span>:{' '}
            <span>{normalizedMetricValue(entry)}</span>
          </p>
        );
      })}
      {payload?.[0]?.payload.category_flag && (
        <p className="text-gray-500">Category Flag</p>
      )}
      {payload?.[0]?.payload.estimated && (
        <p className="text-gray-500">Is estimated</p>
      )}
    </div>
  );
}

export default CustomTooltip;
