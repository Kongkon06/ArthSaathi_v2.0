"use client";
import React, { useState, useEffect } from "react";
import { PlusCircle, X } from "lucide-react";
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
import { motion } from "framer-motion";

type Budget = {
  id?: number;
  icon: string;
  name: string;
  amount: number;
  description?: string;
  totalSpend?: number;
  totalItem?: number;
};

type CreateBudgetProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSave: (budget: Budget, isEdit: boolean) => void;
  budgetToEdit?: Budget | null;
  clearBudgetToEdit: () => void;
};

type FormData = {
  icon: string;
  name: string;
  amount: string;
  description: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

function CreateBudget({
  open,
  setOpen,
  onSave,
  budgetToEdit,
  clearBudgetToEdit,
}: CreateBudgetProps) {
  const [formData, setFormData] = useState<FormData>({
    icon: "💰",
    name: "",
    amount: "",
    description: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (!open && !budgetToEdit) {
      resetForm();
    }
  }, [open, budgetToEdit]);

  useEffect(() => {
    if (budgetToEdit) {
      setFormData({
        icon: budgetToEdit.icon || "💰",
        name: budgetToEdit.name || "",
        amount: budgetToEdit.amount?.toString() || "",
        description: budgetToEdit.description || "",
      });
    }
  }, [budgetToEdit]);

  const resetForm = () => {
    setFormData({
      icon: "💰",
      name: "",
      amount: "",
      description: "",
    });
    setErrors({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Budget name is required";
    }

    if (!formData.amount) {
      newErrors.amount = "Budget amount is required";
    } else if (isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      newErrors.amount = "Please enter a valid amount greater than zero";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const budgetData: Budget = {
      ...formData,
      amount: Number(formData.amount),
      totalSpend: budgetToEdit?.totalSpend || 0,
      totalItem: budgetToEdit?.totalItem || 0,
    };

    onSave(budgetData, !!budgetToEdit);
  };

  const handleCancel = () => {
    clearBudgetToEdit();
    setOpen(false);
  };

  return (
    <>
      {/* Create Budget Card */}
      {!budgetToEdit && (
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          onClick={() => setOpen(true)}
          className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 
                    rounded-xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col items-center 
                    justify-center gap-3 cursor-pointer hover:shadow-md transition-all duration-300 h-full"
        >
          <div className="p-3 rounded-full bg-blue-100 dark:bg-slate-600">
            <PlusCircle size={32} className="text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="font-medium text-lg text-slate-800 dark:text-white">Create New Budget</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
            Set up a new budget to track your expenses
          </p>
        </motion.div>
      )}

      {/* Budget Creation/Edit Dialog */}
      <Dialog open={open} onOpenChange={(isOpen) => {
        if (!isOpen) {
          clearBudgetToEdit();
        }
        setOpen(isOpen);
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{budgetToEdit ? "Edit Budget" : "Create New Budget"}</DialogTitle>
            <DialogDescription>
              {budgetToEdit 
                ? "Update your budget details below" 
                : "Fill in the details to create a new budget"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Emoji Picker */}
            <div className="flex flex-col space-y-2">
              <Label htmlFor="icon">Choose an Icon</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline"
                    className="w-12 h-12 text-2xl"
                    aria-label="Choose emoji icon"
                  >
                    {formData.icon}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <EmojiPicker
                    onEmojiClick={(emojiData:any) => {
                      setFormData(prev => ({ ...prev, icon: emojiData.emoji }));
                    }}
                    width="100%"
                    height={350}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Budget Name */}
            <div className="space-y-2">
              <Label htmlFor="name">
                Budget Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g., Groceries, Utilities, Rent"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            {/* Budget Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount">
                Budget Amount <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">
                  $
                </span>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={handleChange}
                  className={`pl-8 ${errors.amount ? "border-red-500" : ""}`}
                />
              </div>
              {errors.amount && (
                <p className="text-sm text-red-500">{errors.amount}</p>
              )}
            </div>

            {/* Description (Optional) */}
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Input
                id="description"
                name="description"
                placeholder="Add details about this budget"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row sm:space-x-2">
            <Button 
              variant="outline" 
              onClick={handleCancel}
              className="mb-2 sm:mb-0"
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {budgetToEdit ? "Update Budget" : "Create Budget"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreateBudget;