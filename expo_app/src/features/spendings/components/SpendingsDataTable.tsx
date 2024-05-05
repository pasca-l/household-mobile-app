import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
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

export default function SpendingsDataTable(props: any) {
  type Expense = {
    id: string;
    category: string;
    value: number;
    purchase_date: Date;
    purchaser: Map<string, string | boolean>;
    note: string;
  };

  const [expenseList, setExpenseList] = useState<Expense[]>([]);

  useEffect(() => {
    (async () => {
      onSnapshot(
        query(
          collection(FIRESTORE, `spendings/${props.id}/expenses`),
          orderBy("purchase_date", "asc")
        ),
        (snapshot) => {
          setExpenseList(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              category: doc.data().category,
              value: doc.data().value,
              purchase_date: doc.data().purchase_date,
              purchaser: doc.data().purchaser,
              note: doc.data().note,
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
          <DataTable.Title>Category</DataTable.Title>
          <DataTable.Title>Value</DataTable.Title>
        </DataTable.Header>
        {expenseList.map((item: Expense) => (
          <DataTable.Row
            key={item.id}
            onPress={(e) => {
              console.log(e);
            }}
          >
            <DataTable.Cell>{item.category}</DataTable.Cell>
            <DataTable.Cell numeric>{item.value}</DataTable.Cell>
            <DataTable.Cell>
              <Button
                onPress={async () => {
                  await deleteDoc(
                    doc(FIRESTORE, `spendings/${props.id}/expenses`, item.id)
                  );
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
