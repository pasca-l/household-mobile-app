import { useState } from "react";
import { TextInput as NativeTextInput } from "react-native";
import { TextInput, Button, List } from "react-native-paper";

import { Timestamp, addDoc, collection } from "firebase/firestore";
import { FIRESTORE } from "@/utils/firebaseUtils";

export default function SpendingsForm(props: any) {
  type ExpenseRecord = {
    created_at: Timestamp;
    updated_at: Timestamp;
    category: string;
    value: number;
    purchase_date: Timestamp;
    purchaser: {
      user_id: string;
      email: string;
      from_pocket: boolean;
    };
    note: string;
  };

  const [inputValue, setInputValue] = useState<string>("");
  const [pickedCategory, setPickedCategory] = useState<string>("");
  const [expandAccordion, setExpandAccordion] = useState<boolean>(false);

  const categories = [
    "food",
    "daily goods",
    "home appliance",
    "network",
    "gas",
    "water",
    "electricity",
    "house rent",
  ];

  return (
    <>
      <TextInput
        mode="flat"
        label="Item value"
        value={inputValue}
        onChangeText={setInputValue}
        placeholder="300"
        render={(props) => <NativeTextInput inputMode="numeric" {...props} />}
      />
      <List.Section title="category">
        <List.Accordion
          title={pickedCategory}
          expanded={expandAccordion}
          onPress={() => {
            setExpandAccordion(!expandAccordion);
          }}
        >
          {categories.map((c: string) => {
            return (
              <List.Item
                key={c}
                title={c}
                onPress={() => {
                  setPickedCategory(c);
                  setExpandAccordion(!expandAccordion);
                }}
              />
            );
          })}
        </List.Accordion>
      </List.Section>

      <Button
        mode="outlined"
        onPress={async () => {
          setInputValue("");
          setPickedCategory("");

          const record: ExpenseRecord = {
            created_at: Timestamp.fromDate(new Date()),
            updated_at: Timestamp.fromDate(new Date()),
            category: pickedCategory,
            value: Number(inputValue),
            purchase_date: Timestamp.fromDate(new Date()),
            purchaser: {
              user_id: "",
              email: "",
              from_pocket: false,
            },
            note: "",
          };
          await addDoc(
            collection(FIRESTORE, `spendings/${props.id}/expenses`),
            record
          );
        }}
      >
        Send Button
      </Button>
    </>
  );
}
