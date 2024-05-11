import { FIRESTORE } from "@/utils/firebase/firebaseConfig";
import { deleteDoc, doc } from "firebase/firestore";

export const deleteFirestoreDoc = (spendingsId: string, itemId: string) => {
  return async () => {
    await deleteDoc(
      doc(FIRESTORE, `spendings/${spendingsId}/receipts`, itemId)
    );
  };
};
