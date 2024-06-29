import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { FAB } from "react-native-paper";

import SpendingsDetail from "../components/SpendingsDetail";
import SpendingsFormModal from "../components/SpendingsFormModal";
import { Spendings } from "../types/spendings";

export default function DetailPage(spendings: Spendings) {
  const [showForm, setShowForm] = useState<boolean>(false);
  return (
    <View style={styles.container}>
      <SpendingsDetail {...spendings} />
      {/* FIX: duplicated FAB implementation */}
      <FAB
        icon={"plus"}
        style={styles.fab}
        onPress={() => {
          setShowForm(true);
        }}
      />
      <SpendingsFormModal
        spendings={spendings}
        showForm={showForm}
        setShowForm={setShowForm}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
});
