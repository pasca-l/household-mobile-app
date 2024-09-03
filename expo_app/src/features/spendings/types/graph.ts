export type BarGraphData = {
  id: string;
  date: string;
  value: number;
};

export type PieGraphData = {
  id: string;
  date: string;
  value: PieGraphDataPoint[];
};

export type PieGraphDataPoint = {
  label: string;
  value: number;
};
