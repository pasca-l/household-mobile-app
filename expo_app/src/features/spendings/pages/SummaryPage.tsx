import { Stack } from "expo-router";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator, Divider, FAB } from "react-native-paper";

import SpendingsBarGraph from "../components/SpendingsBarGraph";
import SpendingsFormModal from "../components/SpendingsFormModal";
import SpendingsSummaryTable from "../components/SpendingsSummaryTable";
import { useSpendingsContext } from "../contexts/SpendingsContext";
import { useReceiptList } from "../hooks/useReceiptList";

export default function SummaryPage() {
  const spendings = useSpendingsContext();
  const { isLoading } = useReceiptList();

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
          <SpendingsBarGraph />
          <Divider style={styles.divider} />
          <SpendingsSummaryTable />
        </>
      )}
      <FAB
        icon={"plus"}
        style={styles.fab}
        onPress={() => {
          setShowForm(true);
        }}
      />
      <SpendingsFormModal showModal={showForm} setShowModal={setShowForm} />
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
