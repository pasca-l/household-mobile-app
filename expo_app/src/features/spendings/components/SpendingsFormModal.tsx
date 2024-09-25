import { useEffect, useState } from "react";
import { StyleSheet, TextInput as NativeTextInput } from "react-native";
import {
  TextInput,
  Button,
  List,
  Portal,
  Dialog,
  Text,
} from "react-native-paper";

import { category } from "../constants/category";
import { Category } from "../types/category";
import { Receipt } from "../types/receipt";
import { Spendings } from "../types/spendings";
import {
  addFirestoreDoc,
  deleteFirestoreDoc,
  updateFirestoreDoc,
} from "../utils/firestoreCrud";

export default function SpendingsFormModal({
  spendings,
  item,
  showModal,
  setShowModal,
}: {
  spendings: Spendings;
  item?: Receipt | undefined;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}) {
  const categories: Category[] = Object.values(category);

  const [inputDate, setInputDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [inputValue, setInputValue] = useState<string>("");
  const [pickedCategory, setPickedCategory] = useState<Category>(categories[0]);
  const [expandAccordion, setExpandAccordion] = useState<boolean>(false);
  const [disableDelete, setDisableDelete] = useState<boolean>(true);

  useEffect(() => {
    if (item) {
      setInputDate(item.purchase_date.toISOString().split("T")[0]);
      setInputValue(String(item.value));
      setPickedCategory(item.category);

      setDisableDelete(true);
      const timer = setTimeout(() => {
        setDisableDelete(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [item, showModal]);

  return (
    <Portal>
      <Dialog
        visible={showModal}
        onDismiss={() => {
          setShowModal(false);
        }}
      >
        <Dialog.Content style={styles.dialog}>
          {item ? <Text>Item {item.id}</Text> : <></>}
          <TextInput
            mode="flat"
            label="Purchase date"
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

          {item ? (
            <>
              <Button
                mode="outlined"
                onPress={async () => {
                  updateFirestoreDoc(spendings.id, {
                    id: item.id,
                    created_at: item.created_at,
                    updated_at: new Date(),
                    category: pickedCategory,
                    value: Number(inputValue),
                    purchase_date: new Date(Date.parse(inputDate)),
                  });
                  setShowModal(false);
                }}
              >
                Update receipt
              </Button>
              <Button
                mode="outlined"
                onPress={() => {
                  deleteFirestoreDoc(spendings.id, item);
                  setShowModal(false);
                }}
                disabled={disableDelete}
              >
                Delete
              </Button>
            </>
          ) : (
            <Button
              mode="outlined"
              onPress={async () => {
                setInputValue("");
                setPickedCategory(categories[0]);
                addFirestoreDoc(spendings.id, {
                  created_at: new Date(),
                  updated_at: new Date(),
                  category: pickedCategory,
                  value: Number(inputValue),
                  purchase_date: new Date(Date.parse(inputDate)),
                });
                setShowModal(false);
              }}
            >
              Add receipt
            </Button>
          )}
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  dialog: {
    gap: 3,
  },
});
