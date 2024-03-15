/*
  Warnings:

  - You are about to drop the column `actualPaymentAmount` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `defaultPaymentAmount` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `balance` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `finalBill` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "actualPaymentAmount",
DROP COLUMN "defaultPaymentAmount",
ADD COLUMN     "balance" INTEGER NOT NULL,
ADD COLUMN     "finalBill" INTEGER NOT NULL;
