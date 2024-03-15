/*
  Warnings:

  - The primary key for the `Member` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Member` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Member" DROP CONSTRAINT "Member_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Member_pkey" PRIMARY KEY ("userId", "groupId");
