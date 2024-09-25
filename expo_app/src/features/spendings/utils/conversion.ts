import { CategorySummary } from "../types/category";
import { BarGraphData } from "../types/graph";

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
