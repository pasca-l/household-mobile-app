import SpendingsList from "@/features/spendings/components/SpendingsList";
import VaultList from "@/features/vaults/components/VaultList";

export default function AuthenticationServiceList({
  handleSpendingsRoute,
  handleVaultRoute,
}: {
  handleSpendingsRoute: (spendingsId: string) => void;
  handleVaultRoute: (vaultId: string) => void;
}) {
  return (
    <>
      <SpendingsList handleSpendingsRoute={handleSpendingsRoute} />
      <VaultList handleVaultRoute={handleVaultRoute} />
    </>
  );
}
