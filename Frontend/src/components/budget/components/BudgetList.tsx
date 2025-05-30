import { useNavigate } from "react-router-dom";
import { Search, Filter, ChevronDown, Plus, TrendingUp, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import CreateBudget from "./CreateBudget";
import BudgetItem from "./BudgetItem";
import { useCallback, useEffect, useState, useMemo } from "react";
import { useRecoilState } from "recoil";
import { accountAtom } from "@/Atoms/Atom";
import toast from "react-hot-toast";

export interface Account {
  Groceries: number;
  Transport: number;
  Eating_Out: number;
  Entertainment: number;
  Utilities: number;
  Healthcare: number;
  Education: number;
  Miscellaneous: number;
  Income: number;
  Disposable_Income: number;
  Desired_Savings: number;
}

export type Budget = {
  id: number;
  name: string;
  amount: number;
   icon?: string;
  description?: string;
  totalSpend?: number;
  totalItem?: number;
 
};

export type BudgetData = Omit<Budget, 'id'>;

type FilterType = 'all' | 'over' | 'under' | 'high-usage';

function BudgetList() {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useRecoilState(accountAtom);

  const [budgetList, setBudgetList] = useState<Budget[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [budgetToEdit, setBudgetToEdit] = useState<Budget | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);

  // Enhanced budget mapping with proper spend calculation
  const mapAccountsToBudgets = useCallback((): Budget[] => {
    if (!accounts) return [];

    const categoryMapping = [
      { key: 'Groceries', icon: '🛒', name: 'Groceries' },
      { key: 'Transport', icon: '🚗', name: 'Transport' },
      { key: 'Eating_Out', icon: '🍽️', name: 'Eating Out' },
      { key: 'Entertainment', icon: '🎬', name: 'Entertainment' },
      { key: 'Utilities', icon: '💡', name: 'Utilities' },
      { key: 'Healthcare', icon: '🏥', name: 'Healthcare' },
      { key: 'Education', icon: '📚', name: 'Education' },
      { key: 'Miscellaneous', icon: '📦', name: 'Miscellaneous' },
    ];

    return categoryMapping.map((category, index) => {
      const budgetAmount = accounts[category.key as keyof Account] || 0;
      // Calculate spend as a percentage of total budgeted amount
      const totalBudgeted = Object.values(accounts).slice(0, 8).reduce((sum, val) => sum + (val || 0), 0);
      const totalSpent = accounts.Income - accounts.Disposable_Income - accounts.Desired_Savings;
      const categorySpend = totalBudgeted > 0 ? (budgetAmount / totalBudgeted) * totalSpent : 0;

      return {
        id: index + 1,
        name: category.name,
        amount: budgetAmount,
        icon: category.icon,
        totalSpend: Math.max(0, categorySpend),
        totalItem: Math.floor(Math.random() * 10) + 1, // Mock item count
      };
    });
  }, [accounts]);

  const getBudgetList = useCallback(async () => {
    setLoading(true);
    try {
      const mappedBudgets = mapAccountsToBudgets();
      setBudgetList(mappedBudgets);
    } catch (error) {
      console.error('Failed to load budgets:', error);
      toast.error('Failed to load budgets');
      setBudgetList([]);
    } finally {
      setLoading(false);
    }
  }, [mapAccountsToBudgets]);

  useEffect(() => {
    getBudgetList();
  }, [getBudgetList, accounts]);

  // Enhanced calculations with proper error handling
  const budgetStats = useMemo(() => {
    if (!accounts) {
      return {
        totalBudgeted: 0,
        totalSpent: 0,
        remainingBalance: 0,
        overBudgetCount: 0,
        highUsageCount: 0,
      };
    }

    const totalBudgeted = Object.values({
      Groceries: accounts.Groceries || 0,
      Transport: accounts.Transport || 0,
      Eating_Out: accounts.Eating_Out || 0,
      Entertainment: accounts.Entertainment || 0,
      Utilities: accounts.Utilities || 0,
      Healthcare: accounts.Healthcare || 0,
      Education: accounts.Education || 0,
      Miscellaneous: accounts.Miscellaneous || 0,
    }).reduce((sum, val) => sum + val, 0);

    const totalSpent = accounts.Income - accounts.Disposable_Income - accounts.Desired_Savings;
    const remainingBalance = accounts.Disposable_Income - totalBudgeted;

    const overBudgetCount = budgetList.filter((budget) => {
      return budget.totalSpend && budget.totalSpend > budget.amount;
    }).length;

    const highUsageCount = budgetList.filter((budget) => {
      if (!budget.amount || budget.amount === 0) return false;
      const usage = (budget.totalSpend || 0) / budget.amount;
      return usage >= 0.8 && usage < 1;
    }).length;

    return {
      totalBudgeted,
      totalSpent: Math.max(0, totalSpent),
      remainingBalance,
      overBudgetCount,
      highUsageCount,
    };
  }, [accounts, budgetList]);

  const handleDeleteBudget = async (id: number) => {
    try {
      // In a real app, you would call an API here
      const budgetToDelete = budgetList.find(b => b.id === id);
      if (budgetToDelete) {
        // Update the account state by setting the category to 0
        const categoryMap: { [key: string]: keyof Account } = {
          'Groceries': 'Groceries',
          'Transport': 'Transport',
          'Eating Out': 'Eating_Out',
          'Entertainment': 'Entertainment',
          'Utilities': 'Utilities',
          'Healthcare': 'Healthcare',
          'Education': 'Education',
          'Miscellaneous': 'Miscellaneous',
        };

        const accountKey = categoryMap[budgetToDelete.name];
        if (accountKey && accounts) {
          setAccounts({
            ...accounts,
            [accountKey]: 0
          });
        }
      }
      toast.success('Budget deleted successfully');
    } catch (error) {
      console.error('Failed to delete budget:', error);
      toast.error('Failed to delete budget');
    }
  };

  const handleEditBudget = (budget: Budget) => {
    setBudgetToEdit(budget);
    setIsCreateDialogOpen(true);
  };

  const handleCreateOrUpdateBudget = async (
    budgetData: BudgetData,
    isEdit: boolean
  ) => {
    try {
      if (isEdit && budgetToEdit) {
        // Update the account state
        const categoryMap: { [key: string]: keyof Account } = {
          'Groceries': 'Groceries',
          'Transport': 'Transport',
          'Eating Out': 'Eating_Out',
          'Entertainment': 'Entertainment',
          'Utilities': 'Utilities',
          'Healthcare': 'Healthcare',
          'Education': 'Education',
          'Miscellaneous': 'Miscellaneous',
        };

        const accountKey = categoryMap[budgetToEdit.name];
        if (accountKey && accounts) {
          setAccounts({
            ...accounts,
            [accountKey]: budgetData.amount
          });
        }

        toast.success('Budget updated successfully');
      } else {
        // For new budgets, you might want to handle this differently
        toast.success('Budget created successfully');
      }
      setIsCreateDialogOpen(false);
      setBudgetToEdit(null);
    } catch (error) {
      console.error('Failed to save budget:', error);
      toast.error(isEdit ? 'Failed to update budget' : 'Failed to create budget');
    }
  };

  const handleViewBudgetDetails = (budgetId: number) => {
    navigate(`/budgets/${budgetId}`);
  };

  // Enhanced filtering logic
  const filteredBudgets = useMemo(() => {
    return budgetList.filter(budget => {
      const matchesSearch = budget.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (!matchesSearch) return false;

      switch (selectedFilter) {
        case 'over':
          return budget.totalSpend && budget.totalSpend > budget.amount;
        case 'under':
          return !budget.totalSpend || budget.totalSpend < budget.amount;
        case 'high-usage':
          if (!budget.amount || budget.amount === 0) return false;
          const usage = (budget.totalSpend || 0) / budget.amount;
          return usage >= 0.8 && usage < 1;
        default:
          return true;
      }
    });
  }, [budgetList, searchTerm, selectedFilter]);

  const getFilterLabel = (filter: FilterType): string => {
    switch (filter) {
      case 'over': return 'Over Budget';
      case 'under': return 'Under Budget';
      case 'high-usage': return 'High Usage (80%+)';
      default: return 'All Budgets';
    }
  };

  return (
    <div className="space-y-6 w-full">
      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400">Monthly Income</p>
          <p className="text-2xl font-bold dark:text-white">
            ₹{accounts?.Income?.toLocaleString() || 0}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400">Total Budgeted</p>
          <p className="text-2xl font-bold dark:text-white">
            ₹{budgetStats.totalBudgeted.toLocaleString()}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400">Total Spent</p>
          <p className="text-2xl font-bold dark:text-white">
            ₹{budgetStats.totalSpent.toLocaleString()}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400">Remaining Balance</p>
          <p className={`text-2xl font-bold ${budgetStats.remainingBalance < 0 ? 'text-red-500' : 'dark:text-white'}`}>
            ₹{budgetStats.remainingBalance.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Alerts */}
      {budgetStats.overBudgetCount > 0 && (
        <Alert className="border-red-200 bg-red-50 dark:bg-red-900/20">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-700 dark:text-red-300">
            You have {budgetStats.overBudgetCount} budget{budgetStats.overBudgetCount > 1 ? 's' : ''} that exceeded the limit.
          </AlertDescription>
        </Alert>
      )}

      {budgetStats.highUsageCount > 0 && (
        <Alert className="border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20">
          <TrendingUp className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-700 dark:text-yellow-300">
            You have {budgetStats.highUsageCount} budget{budgetStats.highUsageCount > 1 ? 's' : ''} with high usage (80%+).
          </AlertDescription>
        </Alert>
      )}

      {/* Enhanced Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
          <Input
            placeholder="Search budgets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white dark:bg-slate-800"
          />
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter size={16} />
                {getFilterLabel(selectedFilter)}
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSelectedFilter('all')}>
                All Budgets
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedFilter('over')}>
                Over Budget ({budgetStats.overBudgetCount})
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedFilter('under')}>
                Under Budget
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedFilter('high-usage')}>
                High Usage ({budgetStats.highUsageCount})
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={() => setIsCreateDialogOpen(true)} className="flex items-center gap-2">
            <Plus size={16} />
            Add Budget
          </Button>
        </div>
      </div>

      {/* Budget Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Create Budget Card */}
        <CreateBudget 
          open={isCreateDialogOpen}
          setOpen={setIsCreateDialogOpen}
          onSave={handleCreateOrUpdateBudget}
          budgetToEdit={budgetToEdit}
          clearBudgetToEdit={() => setBudgetToEdit(null)}
        />

        {/* Budget List */}
        {loading ? (
          // Enhanced Skeleton loaders
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <div className="text-right space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <Skeleton className="h-2 w-full" />
                <div className="flex justify-between items-center pt-3">
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </div>
          ))
        ) : filteredBudgets.length > 0 ? (
          filteredBudgets.map((budget) => (
            <BudgetItem
              key={budget.id}
              budget={budget}
              onDelete={handleDeleteBudget}
              onEdit={handleEditBudget}
              onViewDetails={handleViewBudgetDetails}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="mx-auto w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
              {searchTerm || selectedFilter !== 'all' ? "No matching budgets" : "No budgets yet"}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mb-4">
              {searchTerm || selectedFilter !== 'all' 
                ? "Try adjusting your search or filter criteria" 
                : "Create your first budget to start tracking your expenses"}
            </p>
            {(!searchTerm && selectedFilter === 'all') && (
              <Button onClick={() => setIsCreateDialogOpen(true)} className="flex items-center gap-2">
                <Plus size={16} />
                Create Budget
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default BudgetList;