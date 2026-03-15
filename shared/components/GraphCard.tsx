'use client';

import { GraphKey, GRAPHS } from '@/features/dashboard/config/graphs';
import { MetricRow } from '@/features/dashboard/types/dashboard';
import BarGraph from '@/shared/components/BarGraph';
import LineGraph from '@/shared/components/LineGraph';

type GraphCardProps = {
  graphKey: GraphKey;
  data: MetricRow[];
};

function GraphCard({ graphKey, data }: GraphCardProps) {
  const graphConfig = GRAPHS[graphKey];
  const GraphComponent = graphConfig.type === 'bar' ? BarGraph : LineGraph;

  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-3 hover:shadow-md hover:bg-gray-50 transition-all">
      <div className="space-y-3 mb-5">
        <h3 className="text-lg font-semibold">{graphConfig.label}</h3>
        <p className="text-sm text-gray-500">{graphConfig.description}</p>
      </div>

      <GraphComponent graphConfig={graphConfig} data={data} />
    </div>
  );
}

export default GraphCard;
