import { useEffect, useState } from "react";
import { Button, DataTable } from "react-native-paper";

import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { FIRESTORE } from "@/utils/firebaseUtils";
import { ScrollView } from "react-native";

export default function SpendingsDataTable() {
  type Expense = {
    id: string;
    name: string;
    date: Date;
    value: number;
  };

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
    <ScrollView>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Value</DataTable.Title>
        </DataTable.Header>
        {expenseList.map((item: any) => (
          <DataTable.Row
            key={item.id}
            onPress={(e) => {
              console.log(e);
            }}
          >
            <DataTable.Cell>{item.name}</DataTable.Cell>
            <DataTable.Cell numeric>{item.value}</DataTable.Cell>
            <DataTable.Cell>
              <Button
                onPress={async () => {
                  await deleteDoc(doc(FIRESTORE, "expenses", item.id));
                }}
              >
                Delete
              </Button>
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </ScrollView>
  );
}
