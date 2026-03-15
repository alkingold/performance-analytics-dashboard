export type Entity = {
  entity_id: number;
  name: string;
  description: string;
};

export type MetricRow = {
  entity_id: number;
  category_flag: boolean;
  year: number;
  estimated: boolean;
  performance_index: number;
  efficiency_ratio: number;
  growth_rate: number;
};

export type DashboardResponse = {
  entities: Entity[];
  metrics: MetricRow[];
};
