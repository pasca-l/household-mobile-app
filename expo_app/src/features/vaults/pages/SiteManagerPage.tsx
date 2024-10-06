import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

import VaultsSiteManager from "../components/VaultSiteManager";
import { useVaultContext } from "../contexts/VaultContext";

export default function SiteManagerPage() {
  const vault = useVaultContext();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: vault.id }} />
      <VaultsSiteManager />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
