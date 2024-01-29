-- AlterTable
ALTER TABLE "User" ADD COLUMN     "activeGroupId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_activeGroupId_fkey" FOREIGN KEY ("activeGroupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;
