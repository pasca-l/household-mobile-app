import { useState } from "react";
import { TextInput as NativeTextInput, View } from "react-native";
import { TextInput, Button, List } from "react-native-paper";

import { Timestamp, addDoc, collection } from "firebase/firestore";
import { FIRESTORE } from "@/utils/firebase/firebaseUtils";

export default function SpendingsForm(props: any) {
  type Receipt = {
    created_at: Timestamp;
    updated_at: Timestamp;
    category: string;
    value: number;
    purchase_date: Timestamp;
  };

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

  const [inputDate, setInputDate] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [pickedCategory, setPickedCategory] = useState<string>(categories[0]);
  const [expandAccordion, setExpandAccordion] = useState<boolean>(false);

  return (
    <View>
      <TextInput
        mode="flat"
        label="purchase_date"
        value={inputDate}
        onChangeText={setInputDate}
        placeholder="YYYY-MM-DD"
      />
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

          const record: Receipt = {
            created_at: Timestamp.fromDate(new Date()),
            updated_at: Timestamp.fromDate(new Date()),
            category: pickedCategory,
            value: Number(inputValue),
            purchase_date: Timestamp.fromDate(new Date(Date.parse(inputDate))),
          };
          await addDoc(
            collection(FIRESTORE, `spendings/${props.id}/receipts`),
            record
          );
        }}
      >
        Send Button
      </Button>
    </View>
  );
}
