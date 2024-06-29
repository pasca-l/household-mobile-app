import { router } from "expo-router";
import { SafeAreaView } from "react-native";

import ListPage from "@/features/spendings/pages/ListPage";

export default function Spendings() {
  const handleSpendingsRoute = (spendingsId: string) => {
    router.push({
      pathname: "/spendings/[id]/",
      params: { id: spendingsId },
    });
  };

  return (
    <SafeAreaView>
      <ListPage handleSpendingsRoute={handleSpendingsRoute} />
    </SafeAreaView>
  );
}
