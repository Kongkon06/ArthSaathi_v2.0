"use client";
import { motion } from "framer-motion";
import { Trash2, Edit, ChevronRight, AlertTriangle, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, type JSX } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type Budget = {
  id: number;
  name: string;
  amount: number;
  icon?: string;
  description?: string;
  totalSpend?: number;
  totalItem?: number;
};

type BudgetItemProps = {
  budget: Budget;
  onDelete: (id: number) => void;
  onEdit: (budget: Budget) => void;
  onViewDetails: (id: number) => void;
};

function BudgetItem({ budget, onDelete, onEdit, onViewDetails }: BudgetItemProps) {
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const calculateProgressPerc = (): number => {
    if (!budget?.amount || budget?.amount === 0) return 0;
    const perc = ((budget.totalSpend || 0) / budget.amount) * 100;
    return Math.min(perc, 100);
  };

  const getStatusColor = (): string => {
    const progress = calculateProgressPerc();
    if (progress >= 100) return "bg-red-500";
    if (progress >= 90) return "bg-orange-500";
    if (progress >= 80) return "bg-yellow-500";
    if (progress >= 60) return "bg-blue-500";
    return "bg-green-500";
  };

  const getStatusText = (): { text: string; color: string; icon?: JSX.Element } => {
    const progress = calculateProgressPerc();
    const remaining = (budget?.amount || 0) - (budget?.totalSpend || 0);
    
    if (progress >= 100) {
      return {
        text: "Over budget",
        color: "text-red-500",
        icon: <AlertTriangle size={14} className="text-red-500" />
      };
    }
    if (progress >= 80) {
      return {
        text: "High usage",
        color: "text-yellow-600",
        icon: <TrendingUp size={14} className="text-yellow-600" />
      };
    }
    return {
      text: remaining > 0 ? "On track" : "Under budget",
      color: "text-green-500"
    };
  };

  const remainingAmount = (budget?.amount || 0) - (budget?.totalSpend || 0);
  const status = getStatusText();
  const progressPerc = calculateProgressPerc();

  const viewBudgetDetails = () => {
    navigate(`/budgets/${budget.id}`);
    if (onViewDetails) {
      onViewDetails(budget.id);
    }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    onDelete(budget.id);
    setShowDeleteConfirm(false);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(budget);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02, y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-5 border border-slate-200 dark:border-slate-700 cursor-pointer group"
        onClick={viewBudgetDetails}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-slate-100 dark:bg-slate-700 group-hover:scale-110 transition-transform duration-200">
              <span className="text-2xl" role="img" aria-label={budget?.name}>
                {budget?.icon || "💰"}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-lg dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {budget?.name || "Untitled Budget"}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {budget?.totalItem || 0} {budget?.totalItem === 1 ? "Item" : "Items"}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-lg dark:text-white">
              ₹{budget?.amount?.toLocaleString() || "0"}
            </p>
            <div className="flex items-center gap-1">
              {status.icon}
              <p className={`text-sm font-medium ${status.color}`}>
                {status.text}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Spent: ₹{budget?.totalSpend?.toLocaleString() || "0"}</span>
            <span className={remainingAmount < 0 ? "text-red-500 font-medium" : ""}>
              {remainingAmount < 0 ? "Over by: " : "Remaining: "}
              ₹{Math.abs(remainingAmount).toLocaleString()}
            </span>
          </div>

          <div className="relative">
            <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPerc}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`h-full rounded-full ${getStatusColor()}`}
              />
            </div>
            <div className="absolute -top-1 text-xs text-slate-600 dark:text-slate-400" 
                 style={{ left: `${Math.min(progressPerc, 95)}%`, transform: 'translateX(-50%)' }}>
              {progressPerc.toFixed(0)}%
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEditClick}
                className="p-1.5 h-auto hover:bg-blue-50 dark:hover:bg-blue-900/20 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                aria-label="Edit budget"
              >
                <Edit size={16} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDeleteClick}
                className="p-1.5 h-auto hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400"
                aria-label="Delete budget"
              >
                <Trash2 size={16} />
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                viewBudgetDetails();
              }}
              className="text-sm flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-2 py-1 h-auto"
            >
              View Details 
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Status indicator overlay */}
        {progressPerc >= 100 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Over Budget
          </div>
        )}
        {progressPerc >= 80 && progressPerc < 100 && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            High Usage
          </div>
        )}
      </motion.div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Budget</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the "{budget?.name}" budget? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default BudgetItem;