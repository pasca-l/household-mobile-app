import { ScrollView } from "react-native";
import { DataTable } from "react-native-paper";

import { category } from "../constants/category";
import { useReceiptList } from "../hooks/useReceiptList";
import { Category, CategorySummary } from "../types/category";
import { Spendings } from "../types/spendings";
import { aggregateToSummary } from "../utils/aggregation";

export default function SpendingsSummary(spendings: Spendings) {
  const receiptList = useReceiptList(spendings);
  const summaryList = aggregateToSummary(receiptList);

  return (
    <ScrollView>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Period</DataTable.Title>
          {category.map((c: Category) => (
            <DataTable.Title>{c}</DataTable.Title>
          ))}
        </DataTable.Header>
        {summaryList.map((item: CategorySummary) => (
          <DataTable.Row key={item.id}>
            <DataTable.Cell>
              {/* slice up to YYYY-MM */}
              {item.date.toISOString().slice(0, 7)}
            </DataTable.Cell>
            {category.map((c: Category) => (
              <DataTable.Cell>{item.agg[c]}</DataTable.Cell>
            ))}
          </DataTable.Row>
        ))}
      </DataTable>
    </ScrollView>
  );
}
