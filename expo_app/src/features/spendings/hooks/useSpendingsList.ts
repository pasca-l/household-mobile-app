import { useQuery } from "@tanstack/react-query";
import { collection, onSnapshot, or, query, where } from "firebase/firestore";


import { FIRESTORE } from "@/utils/firebase/firebaseConfig";
import { useFirebaseAuth } from "@/utils/firebase/hooks/useFirebaseAuth";

import { Spendings } from "../types/spendings";

export const useSpendingsList = () => {
  const user = useFirebaseAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["fetchSpendingsList", user?.uid],
    queryFn: () =>
      new Promise<Spendings[]>((resolve, reject) => {
        if (!user) {
          resolve([]);
          return;
        }

        const unsubscribe = onSnapshot(
          query(
            collection(FIRESTORE, "spendings"),
            or(
              where("owner", "==", `${user.uid}`),
              where("editors", "array-contains", `${user.uid}`)
            )
          ),
          (snapshot) => {
            resolve(snapshot.docs.map((doc) => ({ id: doc.id })));
          },
          reject
        );

        return () => unsubscribe();
      }),
    enabled: !!user,
  });

  return { spendingsList: data ?? [], isLoading };
};
