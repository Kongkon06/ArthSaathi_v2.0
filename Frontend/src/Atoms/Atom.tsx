import { atom } from "recoil"

export const User =  atom({
    key:"User",
    default:{
        email:"",
        password:""
    }
})

export const accountFormAtom = atom({
  key: "accountFormState",
  default: {
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
    familyMembers: [{ name: "", relation: "" }],
  },
});
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

export const accountAtom = atom<Account>({
    key: "accountState",
    default: {
    Groceries: 0,
    Transport: 0,
    Eating_Out: 0,
    Entertainment: 0,
    Utilities: 0,
    Healthcare: 0,
    Education: 0,
    Miscellaneous: 0,
    Income: 0,
    Disposable_Income: 0,
    Desired_Savings: 0,
  }, // Empty array for multiple accounts
  });

  export const BudgetAtom = atom({
    key: "budgetState",
    default: [], // Empty array for multiple accounts
  });
