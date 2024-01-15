import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const deleteBalance = async () => {
  await prisma.balance.deleteMany();
}
