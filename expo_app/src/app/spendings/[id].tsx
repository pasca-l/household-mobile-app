import { useLocalSearchParams } from "expo-router";

import SpendingsScreen from "@/features/spendings/SpendingsScreen";
import { SafeAreaView } from "react-native";

export default function SpendingsByID() {
  const { id } = useLocalSearchParams();

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <SpendingsScreen id={id} />
      </SafeAreaView>
    </>
  );
}
