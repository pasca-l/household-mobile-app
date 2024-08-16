import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native";

export default function VaultsSummary() {
  const { id } = useLocalSearchParams();

  return <SafeAreaView style={{ flex: 1 }}>{id}</SafeAreaView>;
}
