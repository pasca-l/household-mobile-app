import { router } from "expo-router";
import { SafeAreaView } from "react-native";

import SpendingsIndex from "@/features/spendings";

export default function Spendings() {
  const handleSpendingsRoute = (spendingsId: string) => {
    router.push({
      pathname: "/spendings/[id]",
      params: { id: spendingsId },
    });
  };

  return (
    <SafeAreaView>
      <SpendingsIndex handleSpendingsRoute={handleSpendingsRoute} />
    </SafeAreaView>
  );
}
