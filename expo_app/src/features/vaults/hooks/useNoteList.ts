import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";

import { useVaultList } from "./useVaultList";
import { Note, noteConverter } from "../types/note";
import { Vault } from "../types/vault";

import { FIRESTORE } from "@/utils/firebase/firebaseConfig";

export const useNoteList = ({ id }: Vault) => {
  const [noteList, setNoteList] = useState<Note[]>([]);
  const vaultList = useVaultList();

  useEffect(() => {
    if (!vaultList.some((obj) => obj.id === id)) {
      return;
    }

    (async () => {
      onSnapshot(
        query(
          collection(FIRESTORE, `vaults/${id}/notes`).withConverter(
            noteConverter
          )
        ),
        (snapshot) => {
          setNoteList(
            snapshot.docs.map(
              (doc): Note => ({
                id: doc.id,
                created_at: doc.data().created_at,
                updated_at: doc.data().updated_at,
                label: doc.data().label,
                url: doc.data().url,
                username: doc.data().username,
                password: doc.data().password,
              })
            )
          );
        }
      );
    })();

    return () => {};
  }, [vaultList, id]);

  return noteList;
};
