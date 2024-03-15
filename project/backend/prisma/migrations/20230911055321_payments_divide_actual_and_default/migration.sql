/*
  Warnings:

  - You are about to drop the column `amount` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `actualPaymentAmount` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `defaultPaymentAmount` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `difference` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "amount",
ADD COLUMN     "actualPaymentAmount" INTEGER NOT NULL,
ADD COLUMN     "defaultPaymentAmount" INTEGER NOT NULL,
ADD COLUMN     "difference" INTEGER NOT NULL;
