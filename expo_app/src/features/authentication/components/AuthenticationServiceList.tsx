import SpendingsList from "@/features/spendings/components/SpendingsList";
import VaultsList from "@/features/vaults/components/VaultsList";

export default function AuthenticationServiceList({
  handleSpendingsRoute,
  handleVaultsRoute,
}: {
  handleSpendingsRoute: (spendingsId: string) => void;
  handleVaultsRoute: (vaultsId: string) => void;
}) {
  return (
    <>
      <SpendingsList handleSpendingsRoute={handleSpendingsRoute} />
      <VaultsList handleVaultsRoute={handleVaultsRoute} />
    </>
  );
}
