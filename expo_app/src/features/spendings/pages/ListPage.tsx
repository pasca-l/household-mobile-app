import { View } from "react-native";
import { List } from "react-native-paper";

import { useSpendingsList } from "../hooks/useSpendingsList";
import { Spendings } from "../types/spendings";

export default function ListPage({
  handleSpendingsRoute,
}: {
  handleSpendingsRoute: (spendingsId: string) => void;
}) {
  const spendingsList = useSpendingsList();

  return (
    <View>
      <List.Section>
        <List.Subheader>List of Spendings</List.Subheader>
        {spendingsList.map((item: Spendings) => (
          <List.Item
            key={item.id}
            title={item.id}
            onPress={() => {
              handleSpendingsRoute(item.id);
            }}
          />
        ))}
      </List.Section>
    </View>
  );
}
