-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "creatorId" INTEGER NOT NULL,
    "editorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "editedAt" TIMESTAMP(3),
    "amount" INTEGER NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "category" JSONB NOT NULL,
    "memo" TEXT,
    "status" TEXT NOT NULL,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_editorId_fkey" FOREIGN KEY ("editorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
