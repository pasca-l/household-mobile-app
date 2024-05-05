import { SafeAreaView } from "react-native";
import { Button, Text } from "react-native-paper";

import { router } from "expo-router";

import Authentication from "./authentication";

export default function Root() {
  return (
    <>
      <SafeAreaView>
        <Text>Root page</Text>
        <Authentication />
        <Button
          onPress={() => {
            router.push("/spendings/");
          }}
        >
          Move to Spendings page
        </Button>
      </SafeAreaView>
    </>
  );
}
