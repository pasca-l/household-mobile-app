import { ScrollView, StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";

import { category } from "../constants/category";
import { Category, CategorySummary } from "../types/category";

export default function SpendingsSummaryTable({
  summaryList,
}: {
  summaryList: CategorySummary[];
}) {
  return (
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
  );
}

const styles = StyleSheet.create({
  datatable: {
    width: 1300,
  },
});
