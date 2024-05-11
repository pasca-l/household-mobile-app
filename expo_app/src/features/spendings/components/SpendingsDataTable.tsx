import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Button, DataTable, Dialog, Portal, Text } from "react-native-paper";

import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { FIRESTORE } from "@/utils/firebase/firebaseConfig";

export default function SpendingsDataTable(props: any) {
  type Receipt = {
    id: string;
    category: string;
    value: number;
    purchase_date: Date;
  };

  const [showReceiptInfo, setShowReceiptInfo] = useState(false);
  const [receiptList, setReceiptList] = useState<Receipt[]>([]);

  useEffect(() => {
    (async () => {
      onSnapshot(
        query(
          collection(FIRESTORE, `spendings/${props.id}/receipts`),
          orderBy("purchase_date", "asc"),
          orderBy("created_at", "asc")
        ),
        (snapshot) => {
          setReceiptList(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              category: doc.data().category,
              value: doc.data().value,
              purchase_date: doc.data().purchase_date.toDate(),
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
          <DataTable.Title>Purchase date</DataTable.Title>
          <DataTable.Title>Category</DataTable.Title>
          <DataTable.Title>Value</DataTable.Title>
        </DataTable.Header>
        {receiptList.map((item: Receipt) => (
          <DataTable.Row
            key={item.id}
            onPress={() => {
              setShowReceiptInfo(true);
            }}
          >
            <DataTable.Cell>
              {item.purchase_date.toISOString().split("T")[0]}
            </DataTable.Cell>
            <DataTable.Cell>{item.category}</DataTable.Cell>
            <DataTable.Cell numeric>{item.value}</DataTable.Cell>

            <Portal>
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
                        doc(
                          FIRESTORE,
                          `spendings/${props.id}/receipts`,
                          item.id
                        )
                      );
                    }}
                  >
                    Delete
                  </Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </DataTable.Row>
        ))}
      </DataTable>
    </ScrollView>
  );
}
