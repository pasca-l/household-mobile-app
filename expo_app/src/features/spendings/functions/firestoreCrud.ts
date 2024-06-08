import { deleteDoc, doc } from "firebase/firestore";

import { FIRESTORE } from "@/utils/firebase/firebaseConfig";

export const deleteFirestoreDoc = (spendingsId: string, itemId: string) => {
  return async () => {
    await deleteDoc(
      doc(FIRESTORE, `spendings/${spendingsId}/receipts`, itemId)
    );
  };
};
