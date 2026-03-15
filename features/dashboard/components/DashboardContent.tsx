'use client';

import ChartsGrid from '@/features/dashboard/components/ChartsGrid';
import SelectorsSection from '@/features/dashboard/components/SelectorsSection';
import useDashboard from '@/features/dashboard/hooks/useDashboard';

function DashboardContent() {
  const {
    effectiveEntityId,
    setEntityId,
    selectedGraphsKeys,
    setSelectedGraphsKeys,
    isPending,
    error,
    entities,
    selectedEntityData,
  } = useDashboard();

  if (isPending) return <LoadingState />;

  if (error) return <ErrorState error={error} />;

  if (!entities || !selectedEntityData) return <EmptyState />;

  const noSelection = !effectiveEntityId || selectedGraphsKeys.length === 0;

  return (
    <div>
      <SelectorsSection
        entities={entities}
        entityId={effectiveEntityId}
        selectedGraphs={selectedGraphsKeys}
        onEntityChange={setEntityId}
        onGraphChange={setSelectedGraphsKeys}
      />
      {noSelection ? (
        <div className="text-center text-gray-500 py-10">
          Please select an entity and one or more graphs to display.
        </div>
      ) : (
        <ChartsGrid
          selectedGraphsKeys={selectedGraphsKeys}
          data={selectedEntityData}
        />
      )}
    </div>
  );
}

function LoadingState() {
  return <div>Loading data...</div>;
}

function ErrorState({ error }: { error: Error }) {
  return <div>An error has occurred: ${error.message}</div>;
}

function EmptyState() {
  return <div>Here will be displayed selected entity data</div>;
}

export default DashboardContent;
