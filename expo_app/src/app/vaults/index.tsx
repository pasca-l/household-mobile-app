import { router } from "expo-router";
import { SafeAreaView } from "react-native";

import ListPage from "@/features/vaults/pages/ListPage";

export default function Spendings() {
  const handleVaultsRoute = (vaultsId: string) => {
    router.push({
      pathname: "/vaults/[id]/",
      params: { id: vaultsId },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ListPage handleVaultsRoute={handleVaultsRoute} />
    </SafeAreaView>
  );
}
