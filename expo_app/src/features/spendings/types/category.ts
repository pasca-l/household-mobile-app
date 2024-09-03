import { BarGraphData, PieGraphData } from "./graph";
import { category } from "../constants/category";

export type Category = (typeof category)[number];

export type CategorySummary = {
  id: string;
  date: Date;
  agg: { [K in Category]: number };
};

export function toBarGraphData(data: CategorySummary[]): BarGraphData[] {
  // sum up category values for bar graph
  return data
    .map((item) => ({
      id: item.id,
      date: item.date.toISOString().slice(2, 7), // slice up to YY-MM
      value: Object.values(item.agg).reduce((sum, value) => sum + value, 0),
    }))
    .reverse();
}

export function toPieGraphData(data: CategorySummary): PieGraphData {
  // get category values for pie graph
  return {
    id: data.id,
    date: data.date.toISOString().slice(2, 7),
    value: Object.entries(data.agg).map(([label, value]) => ({ label, value })),
  };
}
