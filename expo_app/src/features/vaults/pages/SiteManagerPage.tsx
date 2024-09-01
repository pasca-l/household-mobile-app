import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

import VaultsSiteManager from "../components/VaultSiteManager";
import { Vault } from "../types/vault";

export default function SiteManagerPage(vault: Vault) {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: vault.id }} />
      <VaultsSiteManager {...vault} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
