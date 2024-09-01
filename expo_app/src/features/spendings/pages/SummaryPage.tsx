import { Stack } from "expo-router";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Divider, FAB } from "react-native-paper";

import SpendingsFormModal from "../components/SpendingsFormModal";
import SpendingsGraph from "../components/SpendingsGraph";
import SpendingsSummary from "../components/SpendingsSummary";
import { Spendings } from "../types/spendings";

export default function SummaryPage(spendings: Spendings) {
  const [showForm, setShowForm] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: spendings.id,
        }}
      />
      <SpendingsGraph {...spendings} />
      <Divider style={styles.divider} />
      <SpendingsSummary {...spendings} />
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
    // alignItems: "center",
    // justifyContent: "center",
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
