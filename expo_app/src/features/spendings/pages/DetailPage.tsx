import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator, FAB } from "react-native-paper";

import SpendingsDetailTable from "../components/SpendingsDetailTable";
import SpendingsFormModal from "../components/SpendingsFormModal";
import { useReceiptList } from "../hooks/useReceiptList";
import { Spendings } from "../types/spendings";

export default function DetailPage(spendings: Spendings) {
  const { isLoading } = useReceiptList(spendings);

  const [showForm, setShowForm] = useState(false);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator style={styles.loading} />
      ) : (
        <SpendingsDetailTable spendings={spendings} />
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
});
