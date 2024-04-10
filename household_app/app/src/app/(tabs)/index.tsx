import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";

import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE } from "@/utils/firebaseUtils";

export default function TabOneScreen() {
  const [ExpenseList, setExpenseList] = useState<any[]>([]);

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
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
      {ExpenseList.map((obj: any) => {
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
