"use client";
import { motion } from "framer-motion";
import { Trash2, Edit, ChevronRight } from "lucide-react";
 import { useNavigate } from "react-router-dom";

function BudgetItem({ budget, onDelete, onEdit, onViewDetails }:any) {
  
  // For React Router, you would use:
   const navigate = useNavigate();

  const calculateProgressPerc = () => {
    if (!budget?.amount || budget?.amount === 0) return 0;
    const perc = (budget.totalSpend / budget.amount) * 100;
    return perc > 100 ? 100 : perc.toFixed(2);
  };

  const getStatusColor = () => {
  const progress = Number(calculateProgressPerc());
  if (progress >= 90) return "bg-red-500";
  if (progress >= 70) return "bg-yellow-500";
  return "bg-green-500";
};

  const remainingAmount = (budget?.amount || 0) - (budget?.totalSpend || 0);
  const isOverBudget = remainingAmount < 0;

  const viewBudgetDetails = () => {
     navigate(`/budgets/${budget.id}`);
    
 
    if (onViewDetails) {
      onViewDetails(budget.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-5 border border-slate-200 dark:border-slate-700"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-slate-100 dark:bg-slate-700">
            <span className="text-2xl" role="img" aria-label={budget?.name}>
              {budget?.icon || "💰"}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-lg dark:text-white">
              {budget?.name || "Untitled Budget"}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {budget?.totalItem || 0} {budget?.totalItem === 1 ? "Item" : "Items"}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold text-lg dark:text-white">
            ${budget?.amount?.toLocaleString() || "0"}
          </p>
          <p className={`text-sm ${isOverBudget ? "text-red-500" : "text-green-500"}`}>
            {isOverBudget ? "Over budget" : "Under budget"}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Spent: ${budget?.totalSpend?.toLocaleString() || "0"}</span>
          <span className={isOverBudget ? "text-red-500" : ""}>
            Remaining: ${remainingAmount.toLocaleString()}
          </span>
        </div>

        <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${getStatusColor()}`}
            style={{ width: `${calculateProgressPerc()}%` }}
          />
        </div>

        <div className="pt-3 mt-3 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <div className="flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(budget);
              }}
              className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400"
              aria-label="Edit budget"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(budget.id);
              }}
              className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400"
              aria-label="Delete budget"
            >
              <Trash2 size={16} />
            </button>
          </div>
          <button
            onClick={viewBudgetDetails}
            className="text-sm flex items-center text-blue-600 dark:text-blue-400 hover:underline"
          >
            View Details <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default BudgetItem;