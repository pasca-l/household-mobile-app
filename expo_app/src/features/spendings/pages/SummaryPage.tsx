import { Stack } from "expo-router";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator, Divider, FAB } from "react-native-paper";

import SpendingsBarGraph from "../components/SpendingsBarGraph";
import SpendingsFormModal from "../components/SpendingsFormModal";
import SpendingsSummaryTable from "../components/SpendingsSummaryTable";
import { useReceiptList } from "../hooks/useReceiptList";
import { Spendings } from "../types/spendings";

export default function SummaryPage(spendings: Spendings) {
  const { isLoading } = useReceiptList(spendings);

  const [showForm, setShowForm] = useState(false);

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
          <SpendingsBarGraph spendings={spendings} />
          <Divider style={styles.divider} />
          <SpendingsSummaryTable spendings={spendings} />
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
