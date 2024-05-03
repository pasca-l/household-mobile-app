import { useState } from "react";
import { TextInput as NativeTextInput } from "react-native";
import { TextInput, Button } from "react-native-paper";

import { Timestamp, addDoc, collection } from "firebase/firestore";
import { FIRESTORE } from "@/utils/firebaseUtils";

export default function SpendingsForm() {
  type ExpenseRecord = {
    created_at: Timestamp;
    updated_at: Timestamp;
    category: string;
    value: number;
    purchase_date: Timestamp;
    purchaser: {
      name: string;
      from_pocket: boolean;
    };
    note: string;
  };

  const [inputCategory, setInputCategory] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <>
      <TextInput
        mode="flat"
        label="Item category"
        value={inputCategory}
        onChangeText={setInputCategory}
        placeholder="food"
      />
      <TextInput
        mode="flat"
        label="Item value"
        value={inputValue}
        onChangeText={setInputValue}
        placeholder="300"
        render={(props) => <NativeTextInput inputMode="numeric" {...props} />}
      />
      <Button
        mode="outlined"
        onPress={async () => {
          setInputCategory("");
          setInputValue("");

          const record: ExpenseRecord = {
            created_at: Timestamp.fromDate(new Date()),
            updated_at: Timestamp.fromDate(new Date()),
            category: inputCategory,
            value: Number(inputValue),
            purchase_date: Timestamp.fromDate(new Date()),
            purchaser: {
              name: "",
              from_pocket: false,
            },
            note: "",
          };
          await addDoc(collection(FIRESTORE, "expenses"), record);
        }}
      >
        Send Button
      </Button>
    </>
  );
}
