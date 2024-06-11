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

export const deleteFirestoreDoc = async (
  spendingsId: string,
  receipt: Receipt
) => {
  if (typeof receipt?.id === "string") {
    const itemId = receipt.id;
    return await deleteDoc(
      doc(FIRESTORE, `spendings/${spendingsId}/receipts`, itemId)
    );
  }
};