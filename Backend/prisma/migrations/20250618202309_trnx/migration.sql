/*
  Warnings:

  - Added the required column `category` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "accountType" ADD VALUE 'Family';

-- AlterTable
ALTER TABLE "Transactions" ADD COLUMN     "category" TEXT NOT NULL;
