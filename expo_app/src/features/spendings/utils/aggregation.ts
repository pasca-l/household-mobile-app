import { CategorySummary } from "../types/category";
import { Receipt } from "../types/receipt";

export const aggregateToSummary = (receipts: Receipt[]): CategorySummary[] => {
  type Accumulation = {
    [key: string]: {
      date: Date;
      acc: {
        [category: string]: number;
      };
    };
  };
  const acc: Accumulation = {};

  receipts.forEach((item: Receipt) => {
    // slice up to YYYY-MM
    const key = item.purchase_date.toISOString().slice(0, 7);
    const [year, month] = key.split("-").map(Number);

    // create an empty acc object for a given month, if not exists
    if (!acc[key]) {
      acc[key] = {
        date: new Date(year, month),
        acc: {},
      };
    }

    // initialize category acc value, if not exists
    if (!acc[key].acc[item.category]) {
      acc[key].acc[item.category] = 0;
    }

    acc[key].acc[item.category] += item.value;
  });

  const result: CategorySummary[] = Object.entries(acc).map(
    ([key, val]) =>
      ({
        id: key,
        date: val.date,
        agg: val.acc,
      } as CategorySummary)
  );
  return result;
};
