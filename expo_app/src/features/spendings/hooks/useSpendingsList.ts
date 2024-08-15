import { collection, onSnapshot, or, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

import { Spendings } from "../types/spendings";

import { FIRESTORE } from "@/utils/firebase/firebaseConfig";
import { useFirebaseAuth } from "@/utils/firebase/hooks/useFirebaseAuth";

export const useSpendingsList = () => {
  const [spendingsList, setSpendingsList] = useState<Spendings[]>([]);
  const user = useFirebaseAuth();

  useEffect(() => {
    (async () => {
      if (user) {
        onSnapshot(
          query(
            collection(FIRESTORE, "spendings"),
            or(
              where("owner", "==", `${user.uid}`),
              where("editors", "array-contains", `${user.uid}`)
            )
          ),
          (snapshot) => {
            setSpendingsList(snapshot.docs.map((doc) => ({ id: doc.id })));
          }
        );
      }
    })();

    return () => {};
  }, [user]);

  return spendingsList;
};
