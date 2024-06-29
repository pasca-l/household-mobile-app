import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native";
import { Text } from "react-native-paper";

export default function SpendingsDetails() {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Details {id}</Text>
    </SafeAreaView>
  );
}
