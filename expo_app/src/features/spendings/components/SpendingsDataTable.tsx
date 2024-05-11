import { useState } from "react";
import { ScrollView } from "react-native";
import { Button, DataTable, Dialog, Portal, Text } from "react-native-paper";

import { deleteDoc, doc } from "firebase/firestore";
import { FIRESTORE } from "@/utils/firebase/firebaseConfig";
import { useReceiptList } from "../hooks/useReceiptList";
import { deleteFirestoreDoc } from "../functions/firestoreCrud";

export default function SpendingsDataTable(props: any) {
  type Receipt = {
    id: string;
    category: string;
    value: number;
    purchase_date: Date;
  };

  const receiptList = useReceiptList(props);

  return (
    <ScrollView>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Purchase date</DataTable.Title>
          <DataTable.Title>Category</DataTable.Title>
          <DataTable.Title>Value</DataTable.Title>
          <DataTable.Title> </DataTable.Title>
        </DataTable.Header>
        {receiptList.map((item: Receipt) => (
          <DataTable.Row key={item.id} onPress={() => {}}>
            <DataTable.Cell>
              {item.purchase_date.toISOString().split("T")[0]}
            </DataTable.Cell>
            <DataTable.Cell>{item.category}</DataTable.Cell>
            <DataTable.Cell numeric>{item.value}</DataTable.Cell>
            <DataTable.Cell>
              <Button
                onPress={async () => {
                  await deleteDoc(
                    doc(FIRESTORE, `spendings/${props.id}/receipts`, item.id)
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
