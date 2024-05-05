import { View, StyleSheet } from "react-native";
import { Divider, Text } from "react-native-paper";

import SpendingsForm from "./components/SpendingsForm";
import SpendingsDataTable from "./components/SpendingsDataTable";

export default function SpendingsScreen(props: any) {
  return (
    <View style={styles.container}>
      <Text variant="displaySmall">Spendings</Text>
      <Divider />
      <SpendingsForm id={props.id} />
      <Divider />
      <SpendingsDataTable id={props.id} />
      <Divider />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
});
