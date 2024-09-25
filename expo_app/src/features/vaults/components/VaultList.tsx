import { View } from "react-native";
import { ActivityIndicator, List } from "react-native-paper";

import { useVaultList } from "../hooks/useVaultList";
import { Vault } from "../types/vault";

export default function VaultList({
  handleVaultRoute,
}: {
  handleVaultRoute: (vaultId: string) => void;
}) {
  const { vaultList, isLoading } = useVaultList();

  return (
    <View>
      <List.Section>
        <List.Subheader>List of Vaults</List.Subheader>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          vaultList.map((item: Vault) => (
            <List.Item
              key={item.id}
              title={item.id}
              onPress={() => {
                handleVaultRoute(item.id);
              }}
            />
          ))
        )}
      </List.Section>
    </View>
  );
}
