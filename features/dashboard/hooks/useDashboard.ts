import { GraphKey } from '@/features/dashboard/config/graphs';
import useDashboardData from '@/features/dashboard/hooks/useDashboardData';
import { useMemo, useState } from 'react';

export default function useDashboard() {
  const { isPending, error, data } = useDashboardData();
  const [entityId, setEntityId] = useState<number | null>(null);
  const [selectedGraphsKeys, setSelectedGraphsKeys] = useState<GraphKey[]>([]);

  const effectiveEntityId = entityId ?? data?.entities?.[0].entity_id ?? null;

  const selectedEntityData = useMemo(
    () =>
      data?.metrics
        .filter((entry) => entry.entity_id === effectiveEntityId)
        .sort((a, b) => a.year - b.year),
    [effectiveEntityId, data?.metrics],
  );

  const entities = data?.entities ?? [];

  return {
    effectiveEntityId,
    setEntityId,
    selectedGraphsKeys,
    setSelectedGraphsKeys,
    isPending,
    error,
    entities,
    selectedEntityData,
  };
}
