import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE } from "@/utils/firebaseUtils";

export default function SpendingsScreen() {
  const [expenseList, setExpenseList] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(FIRESTORE, "expenses"));
      querySnapshot.forEach((doc) => {
        setExpenseList((a: any) => [...a, { id: doc.id, expense: doc.data() }]);
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} />
      {expenseList.map((obj: any) => {
        return <Text key={obj.id}>{obj.expense.name}</Text>;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
