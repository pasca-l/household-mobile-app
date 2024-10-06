import { useQuery } from "@tanstack/react-query";
import { collection, onSnapshot, query } from "firebase/firestore";

import { useVaultList } from "./useVaultList";
import { useVaultContext } from "../contexts/VaultContext";
import { Note, noteConverter } from "../types/note";

import { FIRESTORE } from "@/utils/firebase/firebaseConfig";

export const useNoteList = () => {
  const { id } = useVaultContext();
  const { vaultList } = useVaultList();

  const { data, isLoading } = useQuery({
    queryKey: ["fetchNoteList", id],
    queryFn: () =>
      new Promise<Note[]>((resolve, reject) => {
        if (!vaultList.some((obj) => obj.id === id)) {
          resolve([]);
          return;
        }

        const unsubscribe = onSnapshot(
          query(
            collection(FIRESTORE, `vaults/${id}/notes`).withConverter(
              noteConverter
            )
          ),
          (snapshot) => {
            resolve(
              snapshot.docs.map(
                (doc): Note => ({
                  id: doc.id,
                  created_at: doc.data().created_at,
                  updated_at: doc.data().updated_at,
                  label: doc.data().label,
                  url: doc.data().url,
                  username: doc.data().username,
                  password: doc.data().password,
                  other: doc.data().other,
                })
              )
            );
          },
          reject
        );

        return () => unsubscribe();
      }),
    enabled: vaultList.some((obj) => obj.id === id),
  });

  return { noteList: data ?? [], isLoading };
};
