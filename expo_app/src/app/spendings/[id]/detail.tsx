import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native";
import { Text } from "react-native-paper";

import DetailPage from "@/features/spendings/pages/DetailPage";

export default function SpendingsDetails() {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Details {id}</Text>
      <DetailPage id={id.toString()} />
    </SafeAreaView>
  );
}
