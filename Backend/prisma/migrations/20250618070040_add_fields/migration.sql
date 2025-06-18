/*
  Warnings:

  - You are about to drop the column `firstname` on the `Accounts` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `Accounts` table. All the data in the column will be lost.
  - Added the required column `firstname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Accounts" DROP COLUMN "firstname",
DROP COLUMN "lastname";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "firstname" VARCHAR(255) NOT NULL,
ADD COLUMN     "lastname" VARCHAR(255) NOT NULL;
