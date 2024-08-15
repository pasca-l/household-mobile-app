import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";

import { useSpendingsList } from "./useSpendingsList";
import { Receipt, receiptConverter } from "../types/receipt";
import { Spendings } from "../types/spendings";

import { FIRESTORE } from "@/utils/firebase/firebaseConfig";

export const useReceiptList = ({ id }: Spendings) => {
  const [receiptList, setReceiptList] = useState<Receipt[]>([]);
  const spendingsList = useSpendingsList();

  useEffect(() => {
    // checks accessibility from presence of given id in the list of spendings,
    // as the list reflects the restriction by firestore security rules
    if (!spendingsList.some((obj) => obj.id === id)) {
      return;
    }

    (async () => {
      console.log("getting snapshot");
      onSnapshot(
        query(
          collection(FIRESTORE, `spendings/${id}/receipts`).withConverter(
            receiptConverter
          ),
          orderBy("purchase_date", "desc"),
          orderBy("created_at", "desc")
        ),
        (snapshot) => {
          setReceiptList(
            snapshot.docs.map(
              (doc): Receipt => ({
                id: doc.id,
                created_at: doc.data().created_at,
                updated_at: doc.data().updated_at,
                category: doc.data().category,
                value: doc.data().value,
                purchase_date: doc.data().purchase_date,
              })
            )
          );
        }
      );
    })();

    return () => {};
  }, [spendingsList, id]);

  return receiptList;
};
