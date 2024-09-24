import { category } from "../constants/category";

export type Category = (typeof category)[number];

export type CategorySummary = {
  id: string;
  date: Date;
  agg: { [K in Category]: number };
};
