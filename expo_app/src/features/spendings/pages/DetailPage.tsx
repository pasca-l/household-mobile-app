import { View, StyleSheet } from "react-native";

import SpendingsDetail from "../components/SpendingsDetail";
import { Spendings } from "../types/spendings";

export default function DetailPage(spendings: Spendings) {
  return (
    <View style={styles.container}>
      <SpendingsDetail {...spendings} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
