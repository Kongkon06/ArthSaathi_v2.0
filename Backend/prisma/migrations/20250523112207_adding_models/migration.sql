-- CreateEnum
CREATE TYPE "accountType" AS ENUM ('Savings', 'Current');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Accounts" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "account_type" "accountType" NOT NULL DEFAULT 'Savings',
    "dependents" INTEGER NOT NULL,
    "initial_balance" INTEGER NOT NULL,
    "monthly_income" INTEGER NOT NULL,
    "disposable_amount" INTEGER NOT NULL,
    "desired_saving" INTEGER NOT NULL,

    CONSTRAINT "Accounts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Accounts" ADD CONSTRAINT "Accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
