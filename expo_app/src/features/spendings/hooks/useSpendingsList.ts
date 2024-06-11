import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";

import { Spendings } from "../types/spendings";

import { FIRESTORE } from "@/utils/firebase/firebaseConfig";

export const useSpendingsList = () => {
  const [spendingsList, setSpendingsList] = useState<Spendings[]>([]);

  useEffect(() => {
    (async () => {
      onSnapshot(query(collection(FIRESTORE, "spendings")), (snapshot) => {
        setSpendingsList(snapshot.docs.map((doc) => ({ id: doc.id })));
      });
    })();

    return () => {};
  }, []);

  return spendingsList;
};
