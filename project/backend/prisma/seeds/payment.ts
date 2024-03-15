import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const deletePayment = async () => {
  await prisma.payment.deleteMany();
}
