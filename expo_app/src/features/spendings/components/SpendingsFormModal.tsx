import { useEffect, useState } from "react";
import { StyleSheet, TextInput as NativeTextInput, View } from "react-native";
import {
  TextInput,
  Button,
  Portal,
  Dialog,
  Text,
  Chip,
  Divider,
  Snackbar,
} from "react-native-paper";

import { category } from "../constants/category";
import { useReceiptList } from "../hooks/useReceiptList";
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
  const { refetch } = useReceiptList(spendings);

  const categories: Category[] = Object.values(category);

  const [inputDate, setInputDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [inputValue, setInputValue] = useState("");
  const [pickedCategory, setPickedCategory] = useState<Category>(categories[0]);
  const [disableDelete, setDisableDelete] = useState(true);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");

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
            mode="outlined"
            label="Purchase date"
            value={inputDate}
            onChangeText={setInputDate}
            placeholder="YYYY-MM-DD"
          />
          <TextInput
            mode="outlined"
            label="Item value"
            value={inputValue}
            onChangeText={setInputValue}
            render={(props) => (
              <NativeTextInput inputMode="numeric" {...props} />
            )}
          />
          <Divider style={styles.divider} />
          <View style={styles.chips}>
            {categories.map((c: Category) => (
              <Chip
                key={c}
                selected={pickedCategory === c}
                onPress={() => {
                  setPickedCategory(c);
                }}
              >
                {c}
              </Chip>
            ))}
          </View>
          <Divider style={styles.divider} />

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
                  setSnackbarMsg("Updated receipt!");
                  setShowSnackbar(true);
                  refetch();
                }}
              >
                Update receipt
              </Button>
              <Button
                mode="outlined"
                onPress={() => {
                  deleteFirestoreDoc(spendings.id, item);
                  setShowModal(false);
                  setSnackbarMsg("Deleted receipt!");
                  setShowSnackbar(true);
                  refetch();
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
                setSnackbarMsg("Added receipt!");
                setShowSnackbar(true);
                refetch();
              }}
            >
              Add receipt
            </Button>
          )}
        </Dialog.Content>
      </Dialog>
      <Snackbar
        visible={showSnackbar}
        onDismiss={() => {
          setShowSnackbar(false);
        }}
        duration={750}
      >
        {snackbarMsg}
      </Snackbar>
    </Portal>
  );
}

const styles = StyleSheet.create({
  dialog: {
    gap: 3,
  },
  divider: {
    margin: 10,
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    margin: 5,
  },
});
