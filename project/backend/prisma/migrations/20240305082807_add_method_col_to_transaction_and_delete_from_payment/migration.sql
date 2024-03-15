/*
  Warnings:

  - You are about to drop the column `method` on the `Payment` table. All the data in the column will be lost.
  - Changed the type of `status` on the `Balance` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `method` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PROPOSED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('RATIO', 'EVEN', 'AMOUNT_BASIS', 'NONE');

-- AlterTable
ALTER TABLE "Balance" DROP COLUMN "status",
ADD COLUMN     "status" "PaymentStatus" NOT NULL;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "method";

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "method" "PaymentMethod" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "PaymentStatus" NOT NULL;
