import { View } from "react-native";
import { List } from "react-native-paper";

import { useVaultList } from "../hooks/useVaultList";
import { Vault } from "../types/vault";

export default function VaultList({
  handleVaultRoute,
}: {
  handleVaultRoute: (vaultId: string) => void;
}) {
  const vaultsList = useVaultList();

  return (
    <View>
      <List.Section>
        <List.Subheader>List of Vaults</List.Subheader>
        {vaultsList.map((item: Vault) => (
          <List.Item
            key={item.id}
            title={item.id}
            onPress={() => {
              handleVaultRoute(item.id);
            }}
          />
        ))}
      </List.Section>
    </View>
  );
}
