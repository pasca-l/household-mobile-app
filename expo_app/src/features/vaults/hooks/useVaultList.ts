import { collection, onSnapshot, or, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

import { Vault } from "../types/vault";

import { FIRESTORE } from "@/utils/firebase/firebaseConfig";
import { useFirebaseAuth } from "@/utils/firebase/hooks/useFirebaseAuth";

export const useVaultList = () => {
  const user = useFirebaseAuth();
  const [vaultList, setVaultList] = useState<Vault[]>([]);

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
            setVaultList(snapshot.docs.map((doc) => ({ id: doc.id })));
          }
        );
      }
    })();

    return () => {};
  }, [user]);

  return vaultList;
};
