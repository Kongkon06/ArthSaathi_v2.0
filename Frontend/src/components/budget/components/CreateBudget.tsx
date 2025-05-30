"use client";
import React, { useState, useEffect } from "react";
import { PlusCircle, DollarSign, Target, Calendar, AlertCircle, Check } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

type BudgetPeriod = "weekly" | "monthly" | "quarterly" | "yearly";
type BudgetCategory = "food" | "transport" | "entertainment" | "utilities" | "healthcare" | "shopping" | "other";

type Budget = {
  id?: number;
  icon: string;
  name: string;
  amount: number;
  description?: string;
  totalSpend?: number;
  totalItem?: number;
  period?: BudgetPeriod;
  category?: BudgetCategory;
  createdAt?: Date;
  updatedAt?: Date;
};

type CreateBudgetProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSave: (budget: Budget, isEdit: boolean) => void;
  budgetToEdit?: Budget | null;
  clearBudgetToEdit: () => void;
  existingBudgets?: Budget[];
};

type FormData = {
  icon: string;
  name: string;
  amount: string;
  description: string;
  period: BudgetPeriod;
  category: BudgetCategory;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const BUDGET_CATEGORIES: Record<BudgetCategory, { label: string; icon: string }> = {
  food: { label: "Food & Dining", icon: "🍽️" },
  transport: { label: "Transportation", icon: "🚗" },
  entertainment: { label: "Entertainment", icon: "🎬" },
  utilities: { label: "Utilities", icon: "💡" },
  healthcare: { label: "Healthcare", icon: "🏥" },
  shopping: { label: "Shopping", icon: "🛍️" },
  other: { label: "Other", icon: "📂" },
};

const BUDGET_PERIODS: Record<BudgetPeriod, { label: string; multiplier: number }> = {
  weekly: { label: "Weekly", multiplier: 52 },
  monthly: { label: "Monthly", multiplier: 12 },
  quarterly: { label: "Quarterly", multiplier: 4 },
  yearly: { label: "Yearly", multiplier: 1 },
};

function CreateBudget({
  open,
  setOpen,
  onSave,
  budgetToEdit,
  clearBudgetToEdit,
  existingBudgets = [],
}: CreateBudgetProps) {
  const [formData, setFormData] = useState<FormData>({
    icon: "💰",
    name: "",
    amount: "",
    description: "",
    period: "monthly",
    category: "other",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [nameExists, setNameExists] = useState(false);

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (!open && !budgetToEdit) {
      resetForm();
    }
  }, [open, budgetToEdit]);

  // Populate form when editing
  useEffect(() => {
    if (budgetToEdit) {
      setFormData({
        icon: budgetToEdit.icon || "💰",
        name: budgetToEdit.name || "",
        amount: budgetToEdit.amount?.toString() || "",
        description: budgetToEdit.description || "",
        period: budgetToEdit.period || "monthly",
        category: budgetToEdit.category || "other",
      });
    }
  }, [budgetToEdit]);

  // Check for duplicate names
  useEffect(() => {
    if (formData.name.trim()) {
      const isDuplicate = existingBudgets.some(
        (budget) => 
          budget.name.toLowerCase() === formData.name.toLowerCase() &&
          budget.id !== budgetToEdit?.id
      );
      setNameExists(isDuplicate);
    } else {
      setNameExists(false);
    }
  }, [formData.name, existingBudgets, budgetToEdit]);

  const resetForm = () => {
    setFormData({
      icon: "💰",
      name: "",
      amount: "",
      description: "",
      period: "monthly",
      category: "other",
    });
    setErrors({});
    setIsSubmitting(false);
    setShowEmojiPicker(false);
    setNameExists(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Special handling for amount field
    if (name === "amount") {
      // Only allow positive numbers with up to 2 decimal places
      const numericValue = value.replace(/[^0-9.]/g, "");
      const parts = numericValue.split(".");
      if (parts.length > 2) return; // Prevent multiple decimal points
      if (parts[1] && parts[1].length > 2) return; // Limit to 2 decimal places
      
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error for the field being edited
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSelectChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Auto-set icon based on category
    if (name === "category") {
      const categoryIcon = BUDGET_CATEGORIES[value as BudgetCategory]?.icon;
      if (categoryIcon) {
        setFormData((prev) => ({ ...prev, icon: categoryIcon }));
      }
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Budget name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Budget name must be at least 2 characters";
    } else if (formData.name.trim().length > 50) {
      newErrors.name = "Budget name must be less than 50 characters";
    } else if (nameExists) {
      newErrors.name = "A budget with this name already exists";
    }

    // Amount validation
    if (!formData.amount) {
      newErrors.amount = "Budget amount is required";
    } else {
      const amount = parseFloat(formData.amount);
      if (isNaN(amount) || amount <= 0) {
        newErrors.amount = "Please enter a valid amount greater than zero";
      } else if (amount > 1000000) {
        newErrors.amount = "Budget amount cannot exceed $1,000,000";
      }
    }

    // Description validation (optional but if provided, check length)
    if (formData.description.length > 200) {
      newErrors.description = "Description must be less than 200 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const budgetData: Budget = {
        ...formData,
        amount: parseFloat(formData.amount),
        totalSpend: budgetToEdit?.totalSpend || 0,
        totalItem: budgetToEdit?.totalItem || 0,
        period: formData.period,
        category: formData.category,
        updatedAt: new Date(),
        ...(budgetToEdit?.id && { id: budgetToEdit.id }),
        ...(!budgetToEdit && { createdAt: new Date() }),
      };

      await onSave(budgetData, !!budgetToEdit);
      
      toast.success(
        budgetToEdit 
          ? "Budget updated successfully!" 
          : "Budget created successfully!"
      );
      
      handleCancel();
    } catch (error) {
      console.error("Error saving budget:", error);
      toast.error("Failed to save budget. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (budgetToEdit) {
      clearBudgetToEdit();
    }
    setOpen(false);
    resetForm();
  };

  const calculateYearlyAmount = () => {
    const amount = parseFloat(formData.amount);
    if (isNaN(amount)) return 0;
    return amount * BUDGET_PERIODS[formData.period].multiplier;
  };

  return (
    <>
      {/* Create Budget Card */}
      {!budgetToEdit && (
        <motion.div
          whileHover={{ scale: 1.02, y: -4 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          onClick={() => setOpen(true)}
          className="group bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-700 
                    rounded-xl border-2 border-dashed border-blue-200 dark:border-slate-600 p-6 
                    flex flex-col items-center justify-center gap-4 cursor-pointer 
                    hover:border-blue-400 dark:hover:border-slate-500 hover:shadow-lg 
                    transition-all duration-300 h-full min-h-[200px]"
        >
          <motion.div 
            className="p-4 rounded-full bg-blue-100 dark:bg-slate-600 group-hover:bg-blue-200 dark:group-hover:bg-slate-500 transition-colors"
            whileHover={{ rotate: 10 }}
          >
            <PlusCircle size={36} className="text-blue-600 dark:text-blue-400" />
          </motion.div>
          <h3 className="font-semibold text-xl text-slate-800 dark:text-white">Create New Budget</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 text-center leading-relaxed">
            Set up a new budget to track your expenses and reach your financial goals
          </p>
        </motion.div>
      )}

      {/* Budget Creation/Edit Dialog */}
      <Dialog open={open} onOpenChange={handleCancel}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {budgetToEdit ? (
                <>
                  <Target className="h-5 w-5 text-blue-600" />
                  Edit Budget
                </>
              ) : (
                <>
                  <PlusCircle className="h-5 w-5 text-green-600" />
                  Create New Budget
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {budgetToEdit 
                ? "Update your budget details and settings below" 
                : "Fill in the details to create a new budget and start tracking your expenses"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Icon and Category Row */}
            <div className="grid grid-cols-2 gap-4">
              {/* Emoji Picker */}
              <div className="space-y-2">
                <Label htmlFor="icon">Budget Icon</Label>
                <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline"
                      className="w-full h-12 text-2xl hover:scale-105 transition-transform"
                      aria-label="Choose emoji icon"
                    >
                      {formData.icon}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <EmojiPicker
                      onEmojiClick={(emojiData: any) => {
                        setFormData(prev => ({ ...prev, icon: emojiData.emoji }));
                        setShowEmojiPicker(false);
                      }}
                      width={300}
                      height={400}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleSelectChange("category", value)}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(BUDGET_CATEGORIES).map(([key, { label, icon }]) => (
                      <SelectItem key={key} value={key}>
                        <span className="flex items-center gap-2">
                          <span>{icon}</span>
                          <span>{label}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Budget Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                Budget Name 
                <span className="text-red-500">*</span>
                {nameExists && <AlertCircle className="h-4 w-4 text-red-500" />}
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g., Weekly Groceries, Monthly Rent, Entertainment Fund"
                value={formData.name}
                onChange={handleChange}
                className={`${errors.name || nameExists ? "border-red-500 focus:border-red-500" : ""}`}
                maxLength={50}
              />
              <AnimatePresence>
                {(errors.name || nameExists) && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-sm text-red-500 flex items-center gap-1"
                  >
                    <AlertCircle className="h-3 w-3" />
                    {errors.name || "A budget with this name already exists"}
                  </motion.p>
                )}
              </AnimatePresence>
              <div className="text-xs text-slate-500">
                {formData.name.length}/50 characters
              </div>
            </div>

            {/* Amount and Period Row */}
            <div className="grid grid-cols-2 gap-4">
              {/* Budget Amount */}
              <div className="space-y-2">
                <Label htmlFor="amount" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Budget Amount 
                  <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 font-medium">
                    $
                  </span>
                  <Input
                    id="amount"
                    name="amount"
                    type="text"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={handleChange}
                    className={`pl-8 ${errors.amount ? "border-red-500 focus:border-red-500" : ""}`}
                  />
                </div>
                <AnimatePresence>
                  {errors.amount && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-sm text-red-500 flex items-center gap-1"
                    >
                      <AlertCircle className="h-3 w-3" />
                      {errors.amount}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Budget Period */}
              <div className="space-y-2">
                <Label htmlFor="period" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Period
                </Label>
                <Select
                  value={formData.period}
                  onValueChange={(value) => handleSelectChange("period", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(BUDGET_PERIODS).map(([key, { label }]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Yearly Equivalent Display */}
            {formData.amount && !isNaN(parseFloat(formData.amount)) && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-blue-50 dark:bg-slate-800 rounded-lg p-3 border border-blue-200 dark:border-slate-700"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Yearly equivalent:</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    ${calculateYearlyAmount().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </motion.div>
            )}

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Add any additional details about this budget..."
                value={formData.description}
                onChange={handleChange}
                className={`min-h-[80px] ${errors.description ? "border-red-500 focus:border-red-500" : ""}`}
                maxLength={200}
              />
              <div className="flex justify-between text-xs">
                <AnimatePresence>
                  {errors.description && (
                    <motion.span 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-red-500 flex items-center gap-1"
                    >
                      <AlertCircle className="h-3 w-3" />
                      {errors.description}
                    </motion.span>
                  )}
                </AnimatePresence>
                <span className="text-slate-500 ml-auto">
                  {formData.description.length}/200 characters
                </span>
              </div>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              onClick={handleCancel}
              disabled={isSubmitting}
              className="order-2 sm:order-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting || nameExists || Object.keys(errors).length > 0}
              className="order-1 sm:order-2 min-w-[120px]"
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <>
                  {budgetToEdit ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Update Budget
                    </>
                  ) : (
                    <>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Create Budget
                    </>
                  )}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreateBudget;