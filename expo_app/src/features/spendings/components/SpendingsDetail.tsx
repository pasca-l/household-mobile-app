import { useState } from "react";
import { ScrollView } from "react-native";
import { DataTable } from "react-native-paper";

import SpendingsFormModal from "./SpendingsFormModal";
import { useReceiptList } from "../hooks/useReceiptList";
import { Receipt } from "../types/receipt";
import { Spendings } from "../types/spendings";

export default function SpendingsDetail(spendings: Spendings) {
  const receiptList = useReceiptList(spendings);
  const [selectedItem, setSelectedItem] = useState<Receipt>();
  const [showItemModal, setShowItemModal] = useState<boolean>(false);

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
              setShowItemModal(true);
              setSelectedItem(item);
            }}
          >
            <DataTable.Cell>
              {item.purchase_date.toISOString().split("T")[0]}
            </DataTable.Cell>
            <DataTable.Cell>{item.category}</DataTable.Cell>
            <DataTable.Cell numeric>{item.value}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
      <SpendingsFormModal
        spendings={spendings}
        item={selectedItem}
        showModal={showItemModal}
        setShowModal={setShowItemModal}
      />
    </ScrollView>
  );
}
