import axios from 'axios';

export interface MinimalExpenseData {
  accountId: string;
  amount: number;
  type: 'Credit' | 'Debit';
  category: string
}

export interface Expense {
  id: string;
  accountId: string;
  amount: number;
  type: 'Credit' | 'Debit';
  status: 'Success' | 'Failed' | 'Pending';
  createdAt: string;
}

export interface ExpenseStats {
  totalAmount: number;
  categoryBreakdown: {
    category: string;
    amount: number;
    count: number;
  }[];
}

export const expenseService = {
  addExpense: async (expenseData: MinimalExpenseData, token: string): Promise<Expense> => {
    try {
      const response = await axios.post(
        'https://arthsaathi-v2-0.onrender.com/transactions',
        expenseData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error('Add expense error:', error?.response?.data || error.message);
      throw new Error('Failed to add expense');
    }
  },

  getUserExpenses: async (userId: string, token: string): Promise<Expense[]> => {
    try {
      const response = await axios.get(
        `https://arthsaathi-v2-0.onrender.com/transactions/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error('Get user expenses error:', error?.response?.data || error.message);
      throw new Error('Failed to fetch user expenses');
    }
  },

  deleteExpense: async (expenseId: string, token: string): Promise<void> => {
    try {
      await axios.delete(
        `https://arthsaathi-v2-0.onrender.com/transactions/${expenseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error: any) {
      console.error('Delete expense error:', error?.response?.data || error.message);
      throw new Error('Failed to delete expense');
    }
  },

  updateExpense: async (
    expenseId: string,
    expenseData: Partial<MinimalExpenseData>,
    token: string
  ): Promise<Expense> => {
    try {
      const response = await axios.put(
        `https://arthsaathi-v2-0.onrender.com/transactions/${expenseId}`,
        expenseData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error('Update expense error:', error?.response?.data || error.message);
      throw new Error('Failed to update expense');
    }
  },

  formatExpenseDataForChart: (expenses: Expense[]) => {
    const categoryMap = new Map<string, number>();

    // Since we don't have category, group by transaction type as a proxy
    expenses.forEach(expense => {
      const key = expense.type;
      const currentAmount = categoryMap.get(key) || 0;
      categoryMap.set(key, currentAmount + expense.amount);
    });

    const chartColors = [
      '#6366F1', '#10B981', '#F59E0B', '#EF4444',
      '#8B5CF6', '#06B6D4', '#84CC16', '#F97316'
    ];

    return Array.from(categoryMap.entries()).map(([category, amount], index) => ({
      name: category,
      population: amount,
      color: chartColors[index % chartColors.length],
      legendFontColor: '#64748B',
      legendFontSize: 12,
    }));
  },

  calculateTotalExpenses: (expenses: Expense[]): number => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  }
};
