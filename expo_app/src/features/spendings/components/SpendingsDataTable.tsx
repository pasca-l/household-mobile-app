import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { ScrollView } from "react-native";
import { Button, DataTable, Dialog, Portal, Text } from "react-native-paper";

import SpendingsForm from "./SpendingsForm";
import { deleteFirestoreDoc } from "../functions/firestoreCrud";
import { useReceiptList } from "../hooks/useReceiptList";

import { FIRESTORE } from "@/utils/firebase/firebaseConfig";

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
          {/* <DataTable.Title> </DataTable.Title> */}
        </DataTable.Header>
        {receiptList.map((item: Receipt) => (
          <DataTable.Row key={item.id} onPress={() => {}}>
            <DataTable.Cell>
              {item.purchase_date.toISOString().split("T")[0]}
            </DataTable.Cell>
            <DataTable.Cell>{item.category}</DataTable.Cell>
            <DataTable.Cell numeric>{item.value}</DataTable.Cell>
            {/* <DataTable.Cell>
              <Button
                onPress={async () => {
                  await deleteDoc(
                    doc(FIRESTORE, `spendings/${props.id}/receipts`, item.id)
                  );
                }}
              >
                Delete
              </Button>
            </DataTable.Cell> */}
          </DataTable.Row>
        ))}

        {/* <Portal>
          <Dialog
            visible={showReceiptInfo}
            onDismiss={() => {
              setShowReceiptInfo(false);
            }}
          >
            <Dialog.Content>
              <Text>
                {item.category} {item.value}
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={async () => {
                  setShowReceiptInfo(false);
                  await deleteDoc(
                    doc(FIRESTORE, `spendings/${props.id}/receipts`, item.id)
                  );
                  // deleteFirestoreDoc(props.id, item.id);
                }}
              >
                Delete
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal> */}
      </DataTable>
    </ScrollView>
  );
}
