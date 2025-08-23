import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { FIRESTORE } from "@/utils/firebase/firebaseConfig";

import { Receipt, receiptConverter } from "../types/receipt";


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

export const updateFirestoreDoc = async (
  spendingsId: string,
  receipt: Receipt
) => {
  if (typeof receipt.id === "string") {
    const itemId = receipt.id;
    return await updateDoc(
      doc(FIRESTORE, `spendings/${spendingsId}/receipts`, itemId).withConverter(
        receiptConverter
      ),
      receipt
    );
  }
};

export const deleteFirestoreDoc = async (
  spendingsId: string,
  receipt: Receipt
) => {
  if (typeof receipt.id === "string") {
    const itemId = receipt.id;
    return await deleteDoc(
      doc(FIRESTORE, `spendings/${spendingsId}/receipts`, itemId)
    );
  }
};
