import { collection, onSnapshot, or, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

import { Vaults } from "../types/vaults";

import { FIRESTORE } from "@/utils/firebase/firebaseConfig";
import { useFirebaseAuth } from "@/utils/firebase/hooks/useFirebaseAuth";

export const useVaultsList = () => {
  const [vaultsList, setVaultsList] = useState<Vaults[]>([]);
  const user = useFirebaseAuth();

  useEffect(() => {
    (async () => {
      if (user) {
        onSnapshot(
          query(
            collection(FIRESTORE, "vaults"),
            or(
              where("owner", "==", `${user.uid}`),
              where("editors", "array-contains", `${user.uid}`)
            )
          ),
          (snapshot) => {
            setVaultsList(snapshot.docs.map((doc) => ({ id: doc.id })));
          }
        );
      }
    })();

    return () => {};
  }, [user]);

  return vaultsList;
};
