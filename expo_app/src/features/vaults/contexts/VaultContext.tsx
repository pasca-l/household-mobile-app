import { createContext, useContext } from "react";

import { Vault } from "../types/vault";

const VaultContext = createContext({} as Vault);

export const VaultProvider = ({
  children,
  vault,
}: {
  children: React.ReactNode;
  vault: Vault;
}) => {
  return (
    <VaultContext.Provider value={vault}>{children}</VaultContext.Provider>
  );
};

export const useVaultContext = () => {
  return useContext(VaultContext);
};
