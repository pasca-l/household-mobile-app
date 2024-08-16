import SpendingsList from "@/features/spendings/components/SpendingsList";

export default function AuthenticationServiceList({
  handleSpendingsRoute,
}: {
  handleSpendingsRoute: (spendingsId: string) => void;
}) {
  return (
    <>
      <SpendingsList handleSpendingsRoute={handleSpendingsRoute} />
    </>
  );
}
