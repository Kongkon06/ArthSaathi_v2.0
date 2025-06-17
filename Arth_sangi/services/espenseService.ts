// services/expenseService.ts
//import { API_BASE_URL } from '@/constants/config';

export interface ExpenseData {
  category: string;
  amount: number;
  description: string;
  userId: string;
  date: string;
}

export interface Expense extends ExpenseData {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExpenseStats {
  totalAmount: number;
  categoryBreakdown: {
    category: string;
    amount: number;
    count: number;
  }[];
}

class ExpenseService {
  private baseUrl = `${API_BASE_URL*}/api/expenses`;

  async addExpense(expenseData: ExpenseData, token: string): Promise<Expense> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(expenseData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add expense');
      }

      return await response.json();
    } catch (error) {
      console.error('Add expense error:', error);
      throw error;
    }
  }

  async getUserExpenses(userId: string, token: string, period?: string): Promise<Expense[]> {
    try {
      const url = new URL(this.baseUrl);
      url.searchParams.append('userId', userId);
      if (period) {
        url.searchParams.append('period', period);
      }

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch expenses');
      }

      return await response.json();
    } catch (error) {
      console.error('Get expenses error:', error);
      throw error;
    }
  }

  async getMonthlyExpenseStats(userId: string, token: string): Promise<ExpenseStats> {
    try {
      const response = await fetch(`${this.baseUrl}/monthly-stats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch expense stats');
      }

      return await response.json();
    } catch (error) {
      console.error('Get expense stats error:', error);
      throw error;
    }
  }

  async deleteExpense(expenseId: string, token: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/${expenseId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete expense');
      }
    } catch (error) {
      console.error('Delete expense error:', error);
      throw error;
    }
  }

  async updateExpense(expenseId: string, expenseData: Partial<ExpenseData>, token: string): Promise<Expense> {
    try {
      const response = await fetch(`${this.baseUrl}/${expenseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(expenseData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update expense');
      }

      return await response.json();
    } catch (error) {
      console.error('Update expense error:', error);
      throw error;
    }
  }

  // Helper method to format expense data for pie chart
  formatExpenseDataForChart(expenses: Expense[]) {
    const categoryMap = new Map<string, number>();
    
    expenses.forEach(expense => {
      const currentAmount = categoryMap.get(expense.category) || 0;
      categoryMap.set(expense.category, currentAmount + expense.amount);
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
  }

  // Helper method to calculate total expenses
  calculateTotalExpenses(expenses: Expense[]): number {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  }
}

export const expenseService = new ExpenseService();