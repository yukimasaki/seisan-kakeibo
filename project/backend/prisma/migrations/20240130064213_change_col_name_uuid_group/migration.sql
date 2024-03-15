/*
  Warnings:

  - You are about to drop the column `uid` on the `Group` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uuid]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uuid` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Group_uid_key";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "uid",
ADD COLUMN     "uuid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Group_uuid_key" ON "Group"("uuid");
