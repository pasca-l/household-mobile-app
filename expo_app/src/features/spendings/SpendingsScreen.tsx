import { Stack } from "expo-router";
import { View, StyleSheet } from "react-native";
import { Divider, Text } from "react-native-paper";

import SpendingsDataTable from "./components/SpendingsDataTable";
import SpendingsForm from "./components/SpendingsForm";
import { Spendings } from "./types/spendings";

export default function SpendingsScreen(spendings: Spendings) {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: spendings.id,
        }}
      />
      <Text variant="displaySmall">Spendings</Text>
      <Divider />
      <SpendingsForm {...spendings} />
      <Divider />
      <SpendingsDataTable {...spendings} />
      <Divider />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
});
