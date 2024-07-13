import { useState } from "react";
import { TextInput as NativeTextInput } from "react-native";
import { TextInput, Button, List, Portal, Dialog } from "react-native-paper";

import { category } from "../constants/category";
import { Category } from "../types/category";
import { Spendings } from "../types/spendings";
import { addFirestoreDoc } from "../utils/firestoreCrud";

export default function SpendingsFormModal({
  spendings,
  showForm,
  setShowForm,
}: {
  spendings: Spendings;
  showForm: boolean;
  setShowForm: (showForm: boolean) => void;
}) {
  const categories: Category[] = Object.values(category);

  const [inputDate, setInputDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [inputValue, setInputValue] = useState<string>("");
  const [pickedCategory, setPickedCategory] = useState<Category>(categories[0]);
  const [expandAccordion, setExpandAccordion] = useState<boolean>(false);

  return (
    <Portal>
      <Dialog
        visible={showForm}
        onDismiss={() => {
          setShowForm(false);
        }}
      >
        <Dialog.Content>
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
            render={(props) => (
              <NativeTextInput inputMode="numeric" {...props} />
            )}
          />
          <List.Section title="category">
            <List.Accordion
              title={pickedCategory}
              expanded={expandAccordion}
              onPress={() => {
                setExpandAccordion(!expandAccordion);
              }}
            >
              {categories.map((c: Category) => {
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
              addFirestoreDoc(spendings.id, {
                created_at: new Date(),
                updated_at: new Date(),
                category: pickedCategory,
                value: Number(inputValue),
                purchase_date: new Date(Date.parse(inputDate)),
              });
              setShowForm(false);
            }}
          >
            Send Button
          </Button>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
}
