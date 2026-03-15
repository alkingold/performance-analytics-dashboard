'use client';

import { GraphKey } from '@/features/dashboard/config/graphs';
import { MetricRow } from '@/features/dashboard/types/dashboard';
import GraphCard from '@/shared/components/GraphCard';

type ChartsGridProps = {
  selectedGraphsKeys: GraphKey[];
  data: MetricRow[];
};

function ChartsGrid({ selectedGraphsKeys, data }: ChartsGridProps) {
  const cols =
    {
      1: 'lg:grid-cols-1',
      2: 'lg:grid-cols-2',
      3: 'lg:grid-cols-3',
    }[selectedGraphsKeys.length] ?? 'lg:grid-cols-1';

  return (
    <div className={`grid grid-cols-1 ${cols} min-h-6 gap-3.5`}>
      {selectedGraphsKeys.map((key) => (
        <GraphCard key={key} graphKey={key} data={data} />
      ))}
    </div>
  );
}

export default ChartsGrid;
