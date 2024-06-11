import { Button, Dialog, Portal, Text } from "react-native-paper";

import { deleteFirestoreDoc } from "../functions/firestoreCrud";
import { Receipt } from "../types/receipt";
import { Spendings } from "../types/spendings";

export default function SpendingsItemModal({
  spendings,
  item,
  showItemModal,
  setShowItemModal,
}: {
  spendings: Spendings;
  item: Receipt | undefined;
  showItemModal: boolean;
  setShowItemModal: (showItemModal: boolean) => void;
}) {
  return (
    <Portal>
      <Dialog
        visible={showItemModal}
        onDismiss={() => {
          setShowItemModal(false);
        }}
      >
        <Dialog.Content>
          <Text>
            {item?.id} {item?.category} {item?.created_at.toISOString()}
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => {
              deleteFirestoreDoc(spendings.id, item!);
              setShowItemModal(false);
            }}
          >
            Delete
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
