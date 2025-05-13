import { useNavigate } from "react-router-dom";
import { Search, Filter, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import CreateBudget from "./CreateBudget";
import BudgetItem from "./BudgetItem";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { accountAtom } from "@/Atoms/Atom";
import toast from "react-hot-toast";// Import budgetService
// types.ts or at the top of the component file
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
};

export type Budget = {
  id: number;
  name: string;
  amount: number;
};

export type BudgetData = Omit<Budget, 'id'>;
function BudgetList() {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useRecoilState(accountAtom);


  const [budgetList, setBudgetList] = useState<Budget[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [budgetToEdit, setBudgetToEdit] = useState<Budget | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);

  const mapAccountsToBudgets = useCallback((): Budget[] => {
    if (!accounts) return [];

    return [
      { id: 1, name: "Groceries", amount: accounts.Groceries || 0 },
      { id: 2, name: "Transport", amount: accounts.Transport || 0 },
      { id: 3, name: "Eating Out", amount: accounts.Eating_Out || 0 },
      { id: 4, name: "Entertainment", amount: accounts.Entertainment || 0 },
      { id: 5, name: "Utilities", amount: accounts.Utilities || 0 },
      { id: 6, name: "Healthcare", amount: accounts.Healthcare || 0 },
      { id: 7, name: "Education", amount: accounts.Education || 0 },
      { id: 8, name: "Miscellaneous", amount: accounts.Miscellaneous || 0 },
    ];
  }, [accounts]);

  const getBudgetList = useCallback(async () => {
    setLoading(true);
    try {
      const mappedBudgets = mapAccountsToBudgets();
      setBudgetList(mappedBudgets);
    } catch (error) {
      toast.error('Failed to load budgets');
      setBudgetList([]);
    } finally {
      setLoading(false);
    }
  }, [mapAccountsToBudgets]);

  useEffect(() => {
    getBudgetList();
  }, [getBudgetList, accounts]);

  const totalBudgeted: number = Object.values({
    Groceries: accounts?.Groceries || 0,
    Transport: accounts?.Transport || 0,
    Eating_Out: accounts?.Eating_Out || 0,
    Entertainment: accounts?.Entertainment || 0,
    Utilities: accounts?.Utilities || 0,
    Healthcare: accounts?.Healthcare || 0,
    Education: accounts?.Education || 0,
    Miscellaneous: accounts?.Miscellaneous || 0,
  }).reduce((sum, val) => sum + val, 0);

  const totalSpent: number = accounts
    ? accounts.Income - accounts.Disposable_Income - accounts.Desired_Savings
    : 0;

  const overBudgetCount: number = budgetList.filter((budget) => {
    const spent = (budget.amount / totalBudgeted) * totalSpent;
    return spent > budget.amount;
  }).length;

  const handleDeleteBudget = async (id: number) => {
    try {
  
      toast.success('Budget deleted successfully');
    } catch (error) {
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
    
        setBudgetList((prevList) =>
          prevList.map((item) =>
            item.id === budgetToEdit.id ? { ...item, ...budgetData } : item
          )
        );
        toast.success('Budget updated successfully');
      } else {
        toast.success('Budget created successfully');
      }
      setIsCreateDialogOpen(false);
      setBudgetToEdit(null);
    } catch (error) {
      toast.error(isEdit ? 'Failed to update budget' : 'Failed to create budget');
    }
  };

  const handleViewBudgetDetails = (budgetId:any) => {
    navigate(`/budgets/${budgetId}`);
  };

  const filteredBudgets = budgetList.filter(budget => {
    const matchesSearch = budget.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    switch (selectedFilter) {
      case 'over':
        const totalSpend = (budget.amount / totalBudgeted) * totalSpent;
        return matchesSearch && totalSpend > budget.amount;
      case 'under':
        return matchesSearch && budget.id <= budget.amount;
      default:
        return matchesSearch;
    }
  });
  return (
    <div className="space-y-6 w-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400">Monthly Income</p>
          <p className="text-2xl font-bold dark:text-white">₹{accounts?.Income?.toLocaleString() || 0}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400">Disposable Income</p>
          <p className="text-2xl font-bold dark:text-white">₹{accounts?.Disposable_Income?.toLocaleString() || 0}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400">Desired Savings</p>
          <p className="text-2xl font-bold dark:text-white">₹{accounts?.Desired_Savings?.toLocaleString() || 0}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400">Remaining Balance</p>
          <p className="text-2xl font-bold dark:text-white">
            ₹{(accounts?.Disposable_Income - totalBudgeted)?.toLocaleString() || 0}
          </p>
        </div>
      </div>

     <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div className="relative flex-1">
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
                {selectedFilter === 'all' ? 'All Budgets' : 
                 selectedFilter === 'over' ? 'Over Budget' : 'Under Budget'}
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSelectedFilter('all')}>
                All Budgets
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedFilter('over')}>
                Over Budget
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedFilter('under')}>
                Under Budget
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Budget Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Create Budget Card */}
        <CreateBudget 
          open={isCreateDialogOpen}
          setOpen={setIsCreateDialogOpen}
          onSave={handleCreateOrUpdateBudget}
          clearBudgetToEdit={() => setBudgetToEdit(null)}
        />

        {/* Budget List */}
        {loading ? (
          // Skeleton loaders
          Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center gap-3">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
              <Skeleton className="h-2 w-full mt-4" />
              <div className="flex justify-between pt-3">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-20" />
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
          <div className="col-span-full text-center py-10">
            <p className="text-slate-500 dark:text-slate-400">
              {searchTerm || selectedFilter !== 'all' 
                ? "No budgets match your search criteria" 
                : "No budgets created yet. Create your first budget!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BudgetList;