/*
  Warnings:

  - You are about to drop the column `activeGroupId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `hashedPassword` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_activeGroupId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "activeGroupId",
DROP COLUMN "hashedPassword";
