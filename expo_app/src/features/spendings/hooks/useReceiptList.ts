import { FIRESTORE } from "@/utils/firebase/firebaseConfig";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";

type Spendings = {
  id: string;
};

type Receipt = {
  id: string;
  category: string;
  value: number;
  purchase_date: Date;
};

export const useReceiptList = ({ id }: Spendings) => {
  const [receiptList, setReceiptList] = useState<Receipt[]>([]);

  useEffect(() => {
    (async () => {
      onSnapshot(
        query(
          collection(FIRESTORE, `spendings/${id}/receipts`),
          orderBy("purchase_date", "desc"),
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

  return receiptList;
};
