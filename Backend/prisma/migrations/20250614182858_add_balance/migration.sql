/*
  Warnings:

  - You are about to drop the column `initial_balance` on the `Accounts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Accounts" DROP COLUMN "initial_balance",
ADD COLUMN     "current_balance" INTEGER NOT NULL DEFAULT 0;
