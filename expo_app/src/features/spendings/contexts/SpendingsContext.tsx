import { createContext, useContext } from "react";

import { Spendings } from "../types/spendings";

const SpendingsContext = createContext({} as Spendings);

export const SpendingsProvider = ({
  children,
  spendings,
}: {
  children: React.ReactNode;
  spendings: Spendings;
}) => {
  return (
    <SpendingsContext.Provider value={spendings}>
      {children}
    </SpendingsContext.Provider>
  );
};

export const useSpendingsContext = () => {
  return useContext(SpendingsContext);
};
