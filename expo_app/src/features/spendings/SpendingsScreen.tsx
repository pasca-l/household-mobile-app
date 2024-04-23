import { View, StyleSheet } from "react-native";
import { Divider, Text } from "react-native-paper";

import SpendingsForm from "./components/SpendingsForm";
import SpendingsDataTable from "./components/SpendingsDataTable";

export default function SpendingsScreen() {
  return (
    <View style={styles.container}>
      <Text variant="displaySmall">Tab One</Text>
      <Divider />
      <SpendingsForm />
      <Divider />
      <SpendingsDataTable />
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
