import React, { createContext, useContext, useState, ReactNode } from 'react';

// Step 1: Define the User interface
export interface Account {
  id: string;
  FirstName: string;
  LastName: string;
  Age:number;
  Dependents:number;
  CurrentBalance: string;
  AccountType: string;
  MonthlyIncome: string;
  DisposableIncome: string;
  DesiredSavings:string;
}

// Step 2: Define the context value type
interface AccountContextType {
  Account: Account;
  setAccount: (Account: Account) => void;
  updateAccountField: (field: keyof Account, value: string) => void;
}

// Step 3: Create default Account object
const defaultAccount: Account = {
  id: '',
  FirstName: '',
  LastName: '',
  Age: 18,
  Dependents: 0,
  CurrentBalance: '',
  AccountType:'',
  MonthlyIncome:'',
  DisposableIncome:'',
  DesiredSavings:''
};

// Step 4: Create the context
const AccountContext = createContext<AccountContextType | undefined>(undefined);

// Step 5: Create a provider component
export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const [Account, setAccount] = useState<Account>(defaultAccount);

  // Update a single field of the Account
  const updateAccountField = (field: keyof Account, value: string) => {
    setAccount((prevAccount) => ({
      ...prevAccount,
      [field]: value,
    }));
  };

  return (
    <AccountContext.Provider value={{ Account, setAccount, updateAccountField }}>
      {children}
    </AccountContext.Provider>
  );
};

// Step 6: Create a custom hook for consuming the context
export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccount must be used within a AccountProvider');
  }
  return context;
};
