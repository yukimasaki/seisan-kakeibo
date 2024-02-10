/*
  Warnings:

  - Added the required column `userId` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Made the column `membership` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "activeGroupId" INTEGER,
ALTER COLUMN "membership" SET NOT NULL,
ALTER COLUMN "uuid" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_activeGroupId_fkey" FOREIGN KEY ("activeGroupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;
