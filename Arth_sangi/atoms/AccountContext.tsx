import React, { createContext, useContext, useState, ReactNode } from 'react';

// 1. Account interface
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

// 2. Context type for single account
interface AccountContextType {
  account: Account | null;
  setAccount: (account: Account) => void;
  updateAccountField: (field: keyof Account, value: string | number) => void;
}

// 3. Create context
const AccountContext = createContext<AccountContextType | undefined>(undefined);

// 4. Provider component
export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState<Account | null>(null);

  const updateAccountField = (field: keyof Account, value: string | number) => {
    setAccount((prev) =>
      prev ? { ...prev, [field]: value } : prev
    );
  };

  return (
    <AccountContext.Provider value={{ account, setAccount, updateAccountField }}>
      {children}
    </AccountContext.Provider>
  );
};

// 5. Custom hook
export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccount must be used within an AccountProvider');
  }
  return context;
};
