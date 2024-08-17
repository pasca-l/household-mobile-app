import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native";

import SiteManagerPage from "@/features/vaults/pages/SiteManagerPage";

export default function VaultSiteManager() {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SiteManagerPage id={id.toString()} />
    </SafeAreaView>
  );
}
