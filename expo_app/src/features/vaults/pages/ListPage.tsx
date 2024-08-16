import { View } from "react-native";
import { List } from "react-native-paper";

import { useVaultsList } from "../hooks/useVaultsList";
import { Vaults } from "../types/vaults";

export default function ListPage({
  handleVaultsRoute,
}: {
  handleVaultsRoute: (vaultsId: string) => void;
}) {
  const vaultsList = useVaultsList();

  return (
    <View>
      <List.Section>
        <List.Subheader>List of Vaults</List.Subheader>
        {vaultsList.map((item: Vaults) => (
          <List.Item
            key={item.id}
            title={item.id}
            onPress={() => {
              handleVaultsRoute(item.id);
            }}
          />
        ))}
      </List.Section>
    </View>
  );
}
