import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native";

import SummaryPage from "@/features/spendings/pages/SummaryPage";

export default function SpendingsSummary() {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SummaryPage id={id.toString()} />
    </SafeAreaView>
  );
}
