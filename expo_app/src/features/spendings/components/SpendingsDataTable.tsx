import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { ScrollView } from "react-native";
import { Button, DataTable, Dialog, Portal, Text } from "react-native-paper";

import { deleteFirestoreDoc } from "../functions/firestoreCrud";
import { useReceiptList } from "../hooks/useReceiptList";
import { Receipt } from "../types/receipt";

export default function SpendingsDataTable(props: any) {
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
                onPress={
                  typeof item.id === "string"
                    ? deleteFirestoreDoc(props.id, item.id)
                    : () => {}
                }
              >
                Delete
              </Button>
            </DataTable.Cell>
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
