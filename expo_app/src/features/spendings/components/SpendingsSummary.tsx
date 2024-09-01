import { ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, DataTable } from "react-native-paper";

import { category } from "../constants/category";
import { useReceiptList } from "../hooks/useReceiptList";
import { Category, CategorySummary } from "../types/category";
import { Spendings } from "../types/spendings";
import { aggregateToSummary } from "../utils/aggregation";

export default function SpendingsSummary(spendings: Spendings) {
  const { receiptList, isLoading } = useReceiptList(spendings);
  const summaryList = aggregateToSummary(receiptList);

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView>
          <ScrollView horizontal={true}>
            <DataTable style={styles.datatable}>
              <DataTable.Header>
                <DataTable.Title>Period</DataTable.Title>
                {category.map((c: Category) => (
                  <DataTable.Title key={c} style={{ flex: 1 }}>
                    {c}
                  </DataTable.Title>
                ))}
              </DataTable.Header>
              {summaryList.map((item: CategorySummary) => (
                <DataTable.Row key={item.id}>
                  <DataTable.Cell>
                    {/* slice up to YYYY-MM */}
                    {item.date.toISOString().slice(0, 7)}
                  </DataTable.Cell>
                  {category.map((c: Category) => (
                    <DataTable.Cell key={c} style={{ flex: 1 }}>
                      {item.agg[c] !== undefined ? item.agg[c] : "-"}
                    </DataTable.Cell>
                  ))}
                </DataTable.Row>
              ))}
            </DataTable>
          </ScrollView>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  datatable: {
    width: 1300,
  },
});
