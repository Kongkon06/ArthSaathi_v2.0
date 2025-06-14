// accountService.ts

import axios from 'axios';

export interface AccountDetails {
  firstName: string;
  lastName: string;
  age: number;
  dependents: number;
  initialBalance: number;
  accountType: string;
  monthlyIncome: number;
  disposableIncome: number;
  desiredSavings: number;
}

export const accountService = {
  create: async (accountData: AccountDetails, token: string) => {
    try {
      const response = await axios.post(
        'https://arthsaathi-v2-0.onrender.com/accounts/create',
        accountData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error('Account creation failed');
    }
  },

  getAccount: async (token: string) => {
    try {
      const response = await axios.post(
        'https://arthsaathi-v2-0.onrender.com/accounts',
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error('Get account failed');
    }
  },
};
