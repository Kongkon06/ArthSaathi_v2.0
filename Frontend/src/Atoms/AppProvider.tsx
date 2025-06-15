// atoms/AppProvider.tsx
import React from 'react';
import { UserProvider } from './UserContext';
import { AccountProvider } from './AccountContext';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <AccountProvider>
        {children}
      </AccountProvider>
    </UserProvider>
  );
};
