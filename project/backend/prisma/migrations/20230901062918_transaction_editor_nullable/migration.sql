-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_editorId_fkey";

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "editorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_editorId_fkey" FOREIGN KEY ("editorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
