import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
} from "react-native";

import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { FIRESTORE } from "@/utils/firebaseUtils";

export default function SpendingsScreen() {
  type Expense = {
    id: string;
    name: string;
    date: Date;
    value: number;
  };

  const [inputName, setInputName] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [expenseList, setExpenseList] = useState<Expense[]>([]);

  useEffect(() => {
    (async () => {
      onSnapshot(
        query(collection(FIRESTORE, "expenses"), orderBy("date", "asc")),
        (snapshot) => {
          setExpenseList(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              name: doc.data().name,
              date: doc.data().date,
              value: doc.data().value,
            }))
          );
        }
      );
    })();

    return () => {};
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} />
      <TextInput
        value={inputName}
        onChangeText={setInputName}
        placeholder="Item name"
      />
      <TextInput
        value={inputValue}
        onChangeText={setInputValue}
        placeholder="Item value"
        inputMode="numeric"
      />
      <Pressable
        onPress={async () => {
          await addDoc(collection(FIRESTORE, "expenses"), {
            name: inputName,
            value: Number(inputValue),
            date: Timestamp.fromDate(new Date(2024, 3, 10)),
          });
        }}
      >
        <Text>Send Button</Text>
      </Pressable>
      <View style={styles.separator} />
      <FlatList
        data={expenseList}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index, separators }) => {
          console.log(item.date);
          return (
            <>
              <Text>
                {item.name}
                {item.value}
              </Text>
              <Pressable
                onPress={async () => {
                  await deleteDoc(doc(FIRESTORE, "expenses", item.id));
                }}
              >
                <Text>Delete</Text>
              </Pressable>
            </>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
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
