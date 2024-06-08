import { router } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { List } from "react-native-paper";

import { AUTHENTICATION, FIRESTORE } from "@/utils/firebase/firebaseConfig";

export default function Spendings() {
  type Spendings = {
    id: string;
  };

  const [userUID, setUserUID] = useState("");
  const [spendingsList, setSpendingsList] = useState<Spendings[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(AUTHENTICATION, async (user) => {
      if (user) {
        setUserUID(String(user.uid));
      } else {
        setUserUID("undefined");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    (async () => {
      onSnapshot(query(collection(FIRESTORE, "spendings")), (snapshot) => {
        setSpendingsList(snapshot.docs.map((doc) => ({ id: doc.id })));
      });
    })();

    return () => {};
  }, []);

  return (
    <>
      <SafeAreaView>
        <List.Section>
          <List.Subheader>List of Spendings</List.Subheader>
          {spendingsList.map((item: Spendings) => (
            <List.Item
              key={item.id}
              title={item.id}
              onPress={() => {
                router.push({
                  pathname: "/spendings/[id]",
                  params: { id: item.id },
                });
              }}
            />
          ))}
        </List.Section>
      </SafeAreaView>
    </>
  );
}
