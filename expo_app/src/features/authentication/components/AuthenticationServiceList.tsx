import { Button } from "react-native-paper";

export default function AuthenticationServiceList({
  onPressSpendingsList,
}: {
  onPressSpendingsList: () => void;
}) {
  return (
    <>
      <Button onPress={onPressSpendingsList}>Move to Spendings page</Button>
    </>
  );
}
