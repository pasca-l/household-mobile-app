import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native";

// import SummaryPage from "@/features/spendings/pages/SummaryPage";

export default function SpendingsSummary() {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {id}
      {/* <SummaryPage id={id.toString()} /> */}
    </SafeAreaView>
  );
}
