import { useLocalSearchParams } from "expo-router";

import SpendingsScreen from "@/features/spendings/SpendingsScreen";
import { SafeAreaView } from "react-native";

export default function SpendingsByID() {
  const { id } = useLocalSearchParams();

  return (
    <>
      <SafeAreaView>
        <SpendingsScreen id={id} />
      </SafeAreaView>
    </>
  );
}
