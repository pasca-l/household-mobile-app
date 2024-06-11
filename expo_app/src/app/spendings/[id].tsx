import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native";

import SpendingsScreen from "@/features/spendings/SpendingsScreen";

export default function SpendingsByID() {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SpendingsScreen id={id.toString()} />
    </SafeAreaView>
  );
}
