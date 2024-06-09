import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";

import { Receipt, receiptConverter } from "../types/receipt";

import { FIRESTORE } from "@/utils/firebase/firebaseConfig";

export const addFirestoreDoc = async (
  spendingsId: string,
  receipt: Receipt
) => {
  return await addDoc(
    collection(FIRESTORE, `spendings/${spendingsId}/receipts`).withConverter(
      receiptConverter
    ),
    receipt
  );
};

export const deleteFirestoreDoc = (spendingsId: string, itemId: string) => {
  return async () => {
    await deleteDoc(
      doc(FIRESTORE, `spendings/${spendingsId}/receipts`, itemId)
    );
  };
};
