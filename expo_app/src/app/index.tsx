import { router } from "expo-router";
import { SafeAreaView } from "react-native";
import { Button, Text } from "react-native-paper";

import AuthenticationScreen from "@/features/authentication/AuthenticationScreen";

export default function Root() {
  return (
    <SafeAreaView>
      <Text>Root page</Text>
      <AuthenticationScreen />
      <Button
        onPress={() => {
          router.push("/spendings/");
        }}
      >
        Move to Spendings page
      </Button>
    </SafeAreaView>
  );
}
