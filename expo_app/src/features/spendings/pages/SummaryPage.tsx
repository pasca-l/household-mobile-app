import { Stack } from "expo-router";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator, Divider, FAB } from "react-native-paper";

import SpendingsBarGraph from "../components/SpendingsBarGraph";
import SpendingsFormModal from "../components/SpendingsFormModal";
import SpendingsSummaryTable from "../components/SpendingsSummaryTable";
import { useReceiptList } from "../hooks/useReceiptList";
import { Spendings } from "../types/spendings";
import { aggregateToSummary } from "../utils/aggregation";
import { toBarGraphData } from "../utils/conversion";

export default function SummaryPage(spendings: Spendings) {
  const { receiptList, isLoading } = useReceiptList(spendings);
  const summaryList = aggregateToSummary(receiptList);

  const [showForm, setShowForm] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: spendings.id,
        }}
      />
      {isLoading ? (
        <ActivityIndicator style={styles.loading} />
      ) : (
        <>
          <SpendingsBarGraph data={toBarGraphData(summaryList)} />
          <Divider style={styles.divider} />
          <SpendingsSummaryTable summaryList={summaryList} />
        </>
      )}
      <FAB
        icon={"plus"}
        style={styles.fab}
        onPress={() => {
          setShowForm(true);
        }}
      />
      <SpendingsFormModal
        spendings={spendings}
        showModal={showForm}
        setShowModal={setShowForm}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    height: "100%",
  },
  fab: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
  divider: {
    margin: 10,
  },
});
