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

export const accountAtom = atom({
    key: "accountState",
    default: [], // Empty array for multiple accounts
  });

  export const BudgetAtom = atom({
    key: "budgetState",
    default: [], // Empty array for multiple accounts
  });
