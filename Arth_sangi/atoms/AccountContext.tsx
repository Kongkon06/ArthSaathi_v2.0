import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Account {
  id: string;
  userId: string;
  firstname: string;
  lastname: string;
  age: number;
  dependents: number;
  current_balance: number;
  account_type: string;
  monthly_income: number;
  disposable_amount: number;
  desired_savings: number;
}

interface AccountContextType {
  accounts: Account[];
  setAccounts: (accounts: Account[]) => void;
  updateAccountField: (
    id: string,
    field: keyof Account,
    value: string | number
  ) => void;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const [accounts, setAccounts] = useState<Account[]>([]);

  const updateAccountField = (
    id: string,
    field: keyof Account,
    value: string | number
  ) => {
    setAccounts((prevAccounts) =>
      prevAccounts.map((account) =>
        account.id === id ? { ...account, [field]: value } : account
      )
    );
  };

  return (
    <AccountContext.Provider value={{ accounts, setAccounts, updateAccountField }}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccount must be used within an AccountProvider');
  }
  return context;
};
