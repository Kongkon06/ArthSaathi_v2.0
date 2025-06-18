import React, { createContext, useContext, useState, ReactNode } from 'react';

// Step 1: Define the User interface
export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  token:string;
}

// Step 2: Define the context value type
interface UserContextType {
  user: User;
  setUser: (user: User) => void;
  updateUserField: (field: keyof User, value: string) => void;
}

// Step 3: Create default user object
const defaultUser: User = {
  id: '',
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  phoneNumber: '',
  address: '',
  token:''
};

// Step 4: Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Step 5: Create a provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(defaultUser);

  // Update a single field of the user
  const updateUserField = (field: keyof User, value: string) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateUserField }}>
      {children}
    </UserContext.Provider>
  );
};

// Step 6: Create a custom hook for consuming the context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
