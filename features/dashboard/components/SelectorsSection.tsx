import { GraphKey, GRAPHS } from '@/features/dashboard/config/graphs';
import { Entity } from '@/features/dashboard/types/dashboard';
import MultiSelect from '@/shared/components/MultiSelect';
import SingleSelect, { Option } from '@/shared/components/SingleSelect';
import { Dispatch, SetStateAction } from 'react';

type SelectorsSectionTypes = {
  entities: Entity[];
  entityId: number | null;
  selectedGraphs: GraphKey[];
  onEntityChange: Dispatch<SetStateAction<number | null>>;
  onGraphChange: Dispatch<SetStateAction<GraphKey[]>>;
};

function SelectorsSection({
  entities,
  entityId,
  selectedGraphs,
  onEntityChange,
  onGraphChange,
}: SelectorsSectionTypes) {
  // Prepare data for entities select
  const formattedEntities = entities.map((entity) => ({
    value: entity.entity_id,
    label: entity.name,
  }));

  const selectedEntity = entityId
    ? formattedEntities.find((option) => option.value === entityId)
    : formattedEntities[0];

  // Prepare data for graphs select
  const allGraphsOptions: Option<GraphKey>[] = (
    Object.keys(GRAPHS) as GraphKey[]
  ).map((key) => ({
    value: key,
    label: GRAPHS[key].label,
  }));

  const selectedGraphsOptions = allGraphsOptions.filter((option) =>
    selectedGraphs.includes(option.value),
  );

  const handleSelectEntity = (option: Option<number>) => {
    onEntityChange(Number(option.value));
  };

  const handleSelectGraph = (
    options: Option<GraphKey>[],
    numberLimit: number | undefined,
  ) => {
    if (numberLimit && options.length > numberLimit) return;
    onGraphChange(options.map((option) => option.value));
  };

  return (
    <div className="flex gap-x-6 mb-6">
      <SingleSelect
        value={selectedEntity ?? null}
        label="Select entity"
        options={formattedEntities}
        onChange={handleSelectEntity}
      />
      <MultiSelect
        values={selectedGraphsOptions}
        label="Select graphs"
        options={allGraphsOptions}
        maxSelectedOptions={3}
        onChange={handleSelectGraph}
      />
    </div>
  );
}

export default SelectorsSection;
