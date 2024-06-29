import { Stack } from "expo-router";
import { View, StyleSheet } from "react-native";
import { Divider } from "react-native-paper";

import SpendingsForm from "../components/SpendingsForm";
import SpendingsSummary from "../components/SpendingsSummary";
import { Spendings } from "../types/spendings";

export default function SummaryPage(spendings: Spendings) {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: spendings.id,
        }}
      />
      <SpendingsForm {...spendings} />
      <Divider />
      <SpendingsSummary {...spendings} />
      <Divider />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
});
