import { router } from "expo-router";
import { SafeAreaView } from "react-native";
import { Text } from "react-native-paper";

import AuthenticationPage from "@/features/authentication/pages/AuthenticationPage";

export default function Root() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Root page</Text>
      <AuthenticationPage
        onPressSpendingsList={() => {
          router.push("/spendings/");
        }}
      />
    </SafeAreaView>
  );
}
