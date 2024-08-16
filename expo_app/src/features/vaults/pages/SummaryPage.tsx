import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

import VaultsSummary from "../components/VaultsSummary";
import { Vaults } from "../types/vaults";

export default function SummaryPage(vaults: Vaults) {
  return (
    <View style={styles.page}>
      <Stack.Screen options={{ title: vaults.id }} />
      <VaultsSummary {...vaults} />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});
