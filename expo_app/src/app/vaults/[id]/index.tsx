import { SafeAreaView } from "react-native";

import SiteManagerPage from "@/features/vaults/pages/SiteManagerPage";

export default function VaultSiteManager() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SiteManagerPage />
    </SafeAreaView>
  );
}
