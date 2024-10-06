import { SafeAreaView } from "react-native";

import SummaryPage from "@/features/spendings/pages/SummaryPage";

export default function SpendingsSummary() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SummaryPage />
    </SafeAreaView>
  );
}
