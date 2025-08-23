import { useQuery } from "@tanstack/react-query";
import { collection, onSnapshot, or, query, where } from "firebase/firestore";


import { FIRESTORE } from "@/utils/firebase/firebaseConfig";
import { useFirebaseAuth } from "@/utils/firebase/hooks/useFirebaseAuth";

import { Vault } from "../types/vault";

export const useVaultList = () => {
  const user = useFirebaseAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["fetchVaultList", user?.uid],
    queryFn: () =>
      new Promise<Vault[]>((resolve, reject) => {
        if (!user) {
          resolve([]);
          return;
        }

        const unsubscribe = onSnapshot(
          query(
            collection(FIRESTORE, "vaults"),
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

  return { vaultList: data ?? [], isLoading };
};
