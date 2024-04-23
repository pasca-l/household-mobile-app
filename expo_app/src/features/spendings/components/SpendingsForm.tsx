import { useState } from "react";
import { TextInput as NativeTextInput } from "react-native";
import { TextInput, Button } from "react-native-paper";

import { Timestamp, addDoc, collection } from "firebase/firestore";
import { FIRESTORE } from "@/utils/firebaseUtils";

export default function SpendingsForm() {
  const [inputName, setInputName] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <>
      <TextInput
        mode="flat"
        label="Item name"
        value={inputName}
        onChangeText={setInputName}
        placeholder="apple"
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
          // setInputName("");
          // setInputValue("");
          await addDoc(collection(FIRESTORE, "expenses"), {
            name: inputName,
            value: Number(inputValue),
            date: Timestamp.fromDate(new Date(2024, 3, 10)),
          });
        }}
      >
        Send Button
      </Button>
    </>
  );
}
