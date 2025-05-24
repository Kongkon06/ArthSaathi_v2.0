"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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
import { 
  Plus, 
  Users, 
  //User, 
  Wallet, 
  Trash2, 
  Edit, 
  DollarSign, 
  BadgePercent,
  Search,
  //Filter,
  ArrowUpDown,
  TrendingUp,
  PiggyBank,
  Star,
 // Calendar,
  Building2,
  Eye,
  EyeOff
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {  TooltipProvider } from "@/components/ui/tooltip";

const FormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  balance: z.string().min(1, "Balance is required").refine((val) => !isNaN(parseFloat(val)), "Must be a valid number"),
  income: z.string().min(1, "Income is required").refine((val) => !isNaN(parseFloat(val)), "Must be a valid number"),
  age: z.string().min(1, "Age is required").refine((val) => parseInt(val) >= 18, "Must be at least 18 years old"),
  dependents: z.string().refine((val) => parseInt(val) >= 0, "Cannot be negative"),
  disposableIncome: z.string().min(1, "Disposable income is required").refine((val) => !isNaN(parseFloat(val)), "Must be a valid number"),
  desiredSavings: z.string().min(1, "Desired savings is required").refine((val) => !isNaN(parseFloat(val)), "Must be a valid number"),
  accountType: z.enum(["current", "savings", "family"]),
  isDefault: z.boolean(),
  familyMembers: z.array(z.object({
    name: z.string().min(1, "Name is required"),
    relation: z.string().min(1, "Relation is required"),
  })),
});

type FormData = z.infer<typeof FormSchema>;
type FamilyMember = {
  name: string;
  relation: string;
};

type Account = Omit<FormData, 'balance' | 'income' | 'age' | 'dependents' | 'disposableIncome' | 'desiredSavings'> & {
  id: string;
  balance: number;
  income: number;
  age: number;
  dependents: number;
  disposableIncome: number;
  desiredSavings: number;
  createdAt: Date;
};

const Accounts = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "current" | "savings" | "family">("all");
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([{ name: "", relation: "" }]);
  const [accountToEdit, setAccountToEdit] = useState<Account | null>(null);
  const [accountToDelete, setAccountToDelete] = useState<Account | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "balance" | "income" | "created">("created");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [showBalances, setShowBalances] = useState(true);
  
  const [accounts, setAccounts] = useState<Account[]>([
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      balance: 5000,
      income: 3000,
      age: 30,
      dependents: 2,
      disposableIncome: 1000,
      desiredSavings: 1500,
      accountType: "savings",
      isDefault: true,
      familyMembers: [],
      createdAt: new Date('2024-01-15'),
    },
    {
      id: "2",
      firstName: "Jane",
      lastName: "Smith",
      balance: 8000,
      income: 4500,
      age: 40,
      dependents: 1,
      disposableIncome: 2000,
      desiredSavings: 2500,
      accountType: "family",
      isDefault: false,
      familyMembers: [
        { name: "Alice Smith", relation: "Daughter" },
        { name: "Bob Smith", relation: "Son" },
      ],
      createdAt: new Date('2024-02-20'),
    },
    {
      id: "3",
      firstName: "Mike",
      lastName: "Johnson",
      balance: 3500,
      income: 2800,
      age: 28,
      dependents: 0,
      disposableIncome: 800,
      desiredSavings: 1200,
      accountType: "current",
      isDefault: false,
      familyMembers: [],
      createdAt: new Date('2024-03-10'),
    },
  ]);

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      balance: "",
      income: "",
      age: "",
      dependents: "0",
      disposableIncome: "",
      desiredSavings: "",
      accountType: "current",
      isDefault: false,
      familyMembers: [],
    },
  });

  const accountType = form.watch("accountType");

  useEffect(() => {
    if (accountToEdit) {
      form.reset({
        ...accountToEdit,
        balance: accountToEdit.balance.toString(),
        income: accountToEdit.income?.toString() || "",
        age: accountToEdit.age?.toString() || "",
        dependents: accountToEdit.dependents?.toString() || "0",
        disposableIncome: accountToEdit.disposableIncome?.toString() || "",
        desiredSavings: accountToEdit.desiredSavings?.toString() || "",
        familyMembers: accountToEdit.familyMembers || [],
      });

      if (accountToEdit.familyMembers) {
        setFamilyMembers(accountToEdit.familyMembers);
      }
    } else {
      form.reset();
      setFamilyMembers([{ name: "", relation: "" }]);
    }
  }, [accountToEdit, form]);

  const closeAndResetForm = () => {
    form.reset();
    setFamilyMembers([{ name: "", relation: "" }]);
    setAccountToEdit(null);
    setOpenDialog(false);
  };

  const onSubmit = (data: FormData) => {
    // Validate disposable income doesn't exceed income
    const income = parseFloat(data.income);
    const disposableIncome = parseFloat(data.disposableIncome);
    const desiredSavings = parseFloat(data.desiredSavings);
    
    if (disposableIncome > income) {
      form.setError("disposableIncome", { message: "Cannot exceed monthly income" });
      return;
    }
    
    if (desiredSavings > disposableIncome) {
      form.setError("desiredSavings", { message: "Cannot exceed disposable income" });
      return;
    }

    const accountData: Account = {
      ...data,
      id: accountToEdit ? accountToEdit.id : Date.now().toString(),
      balance: parseFloat(data.balance),
      income: parseFloat(data.income),
      age: parseInt(data.age),
      dependents: parseInt(data.dependents),
      disposableIncome: parseFloat(data.disposableIncome),
      desiredSavings: parseFloat(data.desiredSavings),
      familyMembers: data.accountType === "family" ? familyMembers.filter(m => m.name && m.relation) : [],
      createdAt: accountToEdit ? accountToEdit.createdAt : new Date(),
    };

    // Handle default account logic
    if (accountData.isDefault) {
      setAccounts((prev) =>
        prev.map((acc) => ({ ...acc, isDefault: false }))
      );
    }

    if (accountToEdit) {
      setAccounts((prev) =>
        prev.map((acc) => (acc.id === accountToEdit.id ? accountData : acc))
      );
    } else {
      setAccounts((prev) => [...prev, accountData]);
    }

    closeAndResetForm();
  };

  const handleAddFamilyMember = () => {
    setFamilyMembers([...familyMembers, { name: "", relation: "" }]);
  };

  const handleRemoveFamilyMember = (index: number) => {
    if (familyMembers.length > 1) {
      setFamilyMembers(familyMembers.filter((_, i) => i !== index));
    }
  };

  const updateFamilyMember = (index: number, field: keyof FamilyMember, value: string) => {
    const updatedMembers = [...familyMembers];
    updatedMembers[index][field] = value;
    setFamilyMembers(updatedMembers);
  };

  const handleDeleteAccount = () => {
    if (accountToDelete) {
      setAccounts((prev) => prev.filter((acc) => acc.id !== accountToDelete.id));
      setAccountToDelete(null);
    }
  };

  const handleEditAccount = (account: Account) => {
    setAccountToEdit(account);
    setOpenDialog(true);
  };

  // Filter and sort accounts
  const filteredAndSortedAccounts = accounts
    .filter((account) => {
      const matchesTab = activeTab === "all" || account.accountType === activeTab;
      const matchesSearch = searchQuery === "" || 
        `${account.firstName} ${account.lastName}`.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "name":
          comparison = `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
          break;
        case "balance":
          comparison = a.balance - b.balance;
          break;
        case "income":
          comparison = a.income - b.income;
          break;
        case "created":
          comparison = a.createdAt.getTime() - b.createdAt.getTime();
          break;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

  const getAccountTypeIcon = (type: Account["accountType"]) => {
    switch (type) {
      case "family":
        return <Users className="h-5 w-5" />;
      case "savings":
        return <PiggyBank className="h-5 w-5" />;
      default:
        return <Building2 className="h-5 w-5" />;
    }
  };

  const getAccountTypeColor = (type: Account["accountType"]) => {
    switch (type) {
      case "family":
        return "bg-purple-500/10 text-purple-700 border-purple-200";
      case "savings":
        return "bg-green-500/10 text-green-700 border-green-200";
      default:
        return "bg-blue-500/10 text-blue-700 border-blue-200";
    }
  };

  const calculateSavingsProgress = (account: Account) => {
    return Math.min((account.desiredSavings / account.disposableIncome) * 100, 100);
  };

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const totalIncome = accounts.reduce((sum, acc) => sum + acc.income, 0);
  const totalSavingsGoal = accounts.reduce((sum, acc) => sum + acc.desiredSavings, 0);

  return (
    <TooltipProvider>
      <div className="container mx-auto p-6 space-y-8" style={{ width: "1351.28px", transform: "translate(12.4444px, 0px)" }}>
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              My Accounts
            </h1>
            <p className="text-muted-foreground text-lg">
              Manage your personal and family finances with ease
            </p>
          </div>
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:min-w-[400px]">
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Wallet className="h-4 w-4 text-blue-500" />
                  <p className="text-sm font-medium">Total Balance</p>
                </div>
                <p className="text-2xl font-bold">
                  {showBalances ? `₹${totalBalance.toLocaleString()}` : "₹••••••"}
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <p className="text-sm font-medium">Total Income</p>
                </div>
                <p className="text-2xl font-bold">
                  {showBalances ? `₹${totalIncome.toLocaleString()}` : "₹••••••"}
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-purple-500">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <PiggyBank className="h-4 w-4 text-purple-500" />
                  <p className="text-sm font-medium">Savings Goal</p>
                </div>
                <p className="text-2xl font-bold">
                  {showBalances ? `₹${totalSavingsGoal.toLocaleString()}` : "₹••••••"}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Controls Section */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 items-center flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search accounts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="created">Date Created</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="balance">Balance</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              >
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowBalances(!showBalances)}
            >
              {showBalances ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
            
            <Button onClick={() => setOpenDialog(true)} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="h-4 w-4 mr-2" /> Create Account
            </Button>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs value={activeTab} onValueChange={(value: any) => setActiveTab(value)}>
          <TabsList className="grid w-full grid-cols-4 lg:w-96">
            <TabsTrigger value="all">All ({accounts.length})</TabsTrigger>
            <TabsTrigger value="current">Current ({accounts.filter(a => a.accountType === 'current').length})</TabsTrigger>
            <TabsTrigger value="savings">Savings ({accounts.filter(a => a.accountType === 'savings').length})</TabsTrigger>
            <TabsTrigger value="family">Family ({accounts.filter(a => a.accountType === 'family').length})</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredAndSortedAccounts.length > 0 ? (
                filteredAndSortedAccounts.map((account) => (
                  <Card key={account.id} className="overflow-hidden hover:shadow-lg transition-all duration-200 border-0 shadow-md" style={{ height: "513.125px", transition: "none" }}>
                    <CardHeader className="pb-3 bg-gradient-to-r from-slate-50 to-slate-100/50">
                      <div className="flex justify-between items-start">
                        <div className="flex gap-3 items-center">
                          <div className={`p-2 rounded-xl ${getAccountTypeColor(account.accountType)}`}>
                            {getAccountTypeIcon(account.accountType)}
                          </div>
                          <div>
                            <CardTitle className="text-lg font-semibold">
                              {account.firstName} {account.lastName}
                            </CardTitle>
                            <CardDescription className="capitalize flex items-center gap-2">
                              {account.accountType} Account
                              {account.isDefault && (
                                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                                  <Star className="h-3 w-3 mr-1" /> Default
                                </Badge>
                              )}
                            </CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Balance</p>
                          <p className="text-2xl font-bold text-green-600">
                            {showBalances ? `₹${account.balance.toLocaleString()}` : "₹••••••"}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Monthly Income</p>
                          <p className="text-lg font-semibold">
                            {showBalances ? `₹${account.income.toLocaleString()}` : "₹••••••"}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="text-center p-2 bg-slate-50 rounded-lg">
                          <p className="text-xs text-muted-foreground">Age</p>
                          <p className="text-sm font-medium">{account.age}</p>
                        </div>
                        <div className="text-center p-2 bg-slate-50 rounded-lg">
                          <p className="text-xs text-muted-foreground">Dependents</p>
                          <p className="text-sm font-medium">{account.dependents}</p>
                        </div>
                        <div className="text-center p-2 bg-slate-50 rounded-lg">
                          <p className="text-xs text-muted-foreground">Created</p>
                          <p className="text-sm font-medium">{account.createdAt.toLocaleDateString()}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-muted-foreground">Savings Progress</p>
                          <p className="text-sm font-medium">
                            {showBalances ? `₹${account.desiredSavings.toLocaleString()}` : "₹••••••"} / month
                          </p>
                        </div>
                        <Progress value={calculateSavingsProgress(account)} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          {calculateSavingsProgress(account).toFixed(1)}% of disposable income
                        </p>
                      </div>

                      {account.accountType === "family" && account.familyMembers && account.familyMembers.length > 0 && (
                        <div className="space-y-2 p-3 bg-purple-50 rounded-lg border border-purple-100">
                          <p className="text-sm font-medium flex items-center gap-2">
                            <Users className="h-4 w-4" /> Family Members
                          </p>
                          <div className="space-y-1">
                            {account.familyMembers.slice(0, 2).map((member, idx) => (
                              <div key={idx} className="flex justify-between items-center text-sm">
                                <span className="font-medium">{member.name}</span>
                                <Badge variant="outline" className="text-xs">{member.relation}</Badge>
                              </div>
                            ))}
                            {account.familyMembers.length > 2 && (
                              <p className="text-xs text-muted-foreground">
                                +{account.familyMembers.length - 2} more members
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                    
                    <Separator />
                    <CardFooter
                      className="pt-4 flex justify-end gap-2"
                      style={{
                        position: "relative",
                        left: 0,
                        top: -31,
                        transition: "none",
                        cursor: "move",
                      }}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditAccount(account)}
                        className="hover:bg-blue-50"
                       
                      >
                        <Edit className="h-4 w-4 mr-1" /> Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setAccountToDelete(account)}
                        className="hover:bg-red-600 text-black hover:text-white"
                      >
                        <Trash2 className="h-4 w-4 mr-1 text-black" /> Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center p-12 text-center">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-full mb-6">
                    <Wallet className="h-16 w-16 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No accounts found</h3>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    {searchQuery 
                      ? `No accounts match "${searchQuery}". Try adjusting your search.`
                      : activeTab === "all"
                      ? "You haven't created any accounts yet. Start by creating your first account."
                      : `You don't have any ${activeTab} accounts yet.`}
                  </p>
                  <Button onClick={() => setOpenDialog(true)} size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
                    <Plus className="h-5 w-5 mr-2" /> Create Your First Account
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Create/Edit Dialog */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {accountToEdit ? "Edit Account" : "Create New Account"}
              </DialogTitle>
              <DialogDescription>
                {accountToEdit 
                  ? "Update your account information below." 
                  : "Fill in the details to create a new account."}
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input placeholder="25" type="number" min="18" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dependents"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Dependents</FormLabel>
                        <FormControl>
                          <Input placeholder="0" type="number" min="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="balance"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Balance</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <DollarSign className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                            <Input
                              placeholder="5000.00"
                              type="number"
                              step="0.01"
                              min="0"
                              className="pl-9"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="accountType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Type</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select account type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="current">Current Account</SelectItem>
                            <SelectItem value="savings">Savings Account</SelectItem>
                            <SelectItem value="family">Family Account</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />  
                </div>

                <FormField
                  control={form.control}
                  name="income"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monthly Income</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <DollarSign className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                          <Input
                            placeholder="5000.00"
                            type="number"
                            step="0.01"
                            min="0"
                            className="pl-9"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="disposableIncome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Disposable Income</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <DollarSign className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                            <Input
                              placeholder="1000.00"
                              type="number"
                              step="0.01"
                              min="0"
                              className="pl-9"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="desiredSavings"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Desired Monthly Savings</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <BadgePercent className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                            <Input
                              placeholder="500.00"
                              type="number"
                              step="0.01"
                              min="0"
                              className="pl-9"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Family Members Section */}
                {accountType === "family" && (
                  <div className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium flex items-center gap-2">
                        <Users className="h-4 w-4" /> Family Members
                      </h3>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        onClick={handleAddFamilyMember}
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add Member
                      </Button>
                    </div>
                    {familyMembers.map((member, index) => (
                      <div key={index} className="grid grid-cols-5 gap-3 items-center">
                        <div className="col-span-2">
                          <FormLabel className="text-xs">Name</FormLabel>
                          <Input
                            value={member.name}
                            onChange={(e) => updateFamilyMember(index, "name", e.target.value)}
                            placeholder="Member name"
                          />
                        </div>
                        <div className="col-span-2">
                          <FormLabel className="text-xs">Relation</FormLabel>
                          <Input
                            value={member.relation}
                            onChange={(e) => updateFamilyMember(index, "relation", e.target.value)}
                            placeholder="e.g. Spouse, Child"
                          />
                        </div>
                        <div className="flex items-end">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveFamilyMember(index)}
                            disabled={familyMembers.length === 1}
                            className="h-9 mt-auto"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="isDefault"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div>
                        <FormLabel>Set as Default Account</FormLabel>
                        <p className="text-xs text-muted-foreground">
                          This account will be used for primary transactions
                        </p>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-3 pt-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={closeAndResetForm}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {accountToEdit ? "Save Changes" : "Create Account"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!accountToDelete} onOpenChange={() => setAccountToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Account</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete{" "}
                <span className="font-semibold">
                  {accountToDelete?.firstName} {accountToDelete?.lastName}
                </span>
                's account? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setAccountToDelete(null)}>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                className="bg-red-600 hover:bg-red-700"
                onClick={handleDeleteAccount}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </TooltipProvider>
  );
};

export default Accounts;