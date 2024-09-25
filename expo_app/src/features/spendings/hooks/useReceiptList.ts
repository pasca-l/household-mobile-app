import { useQuery } from "@tanstack/react-query";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

import { useSpendingsList } from "./useSpendingsList";
import { Receipt, receiptConverter } from "../types/receipt";
import { Spendings } from "../types/spendings";

import { FIRESTORE } from "@/utils/firebase/firebaseConfig";

export const useReceiptList = ({ id }: Spendings) => {
  const { spendingsList } = useSpendingsList();

  const { data, isLoading } = useQuery({
    queryKey: ["fetchReceiptList", id],
    queryFn: () =>
      new Promise<Receipt[]>((resolve, reject) => {
        // checks accessibility from presence of given id in the spendings list,
        // as the list reflects the restriction by firestore security rules
        if (!spendingsList.some((obj) => obj.id === id)) {
          resolve([]);
          return;
        }

        const unsubscribe = onSnapshot(
          query(
            collection(FIRESTORE, `spendings/${id}/receipts`).withConverter(
              receiptConverter
            ),
            orderBy("purchase_date", "desc"),
            orderBy("created_at", "desc")
          ),
          (snapshot) => {
            resolve(
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
          },
          reject
        );

        return () => unsubscribe();
      }),
    enabled: spendingsList.some((obj) => obj.id === id),
  });

  return { receiptList: data ?? [], isLoading };
};
