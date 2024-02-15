import { PrismaClient } from '@prisma/client';
import * as dayjs from 'dayjs';
import { CreateTransactionFormData } from '@@nest/transaction/dto/create-transaction.dto';
import { randBetween } from '@@nest/utils/randBetween';
import { PrismaService } from '@@nest/common/prisma/prisma.service';
import { TransactionService } from '@@nest/transaction/transaction.service';

const prisma = new PrismaClient();

export const deleteTransaction = async () => {
  await prisma.transaction.deleteMany();
};

export const createTransaction = async () => {
  Array.from({ length: 30 }, async (_, index) => {
    const prismaService = new PrismaService();
    const transactionService = new TransactionService(prismaService);

    const amount = randBetween(1000, 49999);

    const start = dayjs().startOf('year').format('YYYY-MM-DD');
    const end = dayjs().endOf('month').format('YYYY-MM-DD');

    const formData: CreateTransactionFormData = {
      creatorId: 1,
      amount,
      paymentDate: randomDate(start, end),
      title: `取引 #${randBetween(1, 100)}`,
      memo: `備考`,
      status: `未精算`,
      categoryId: randBetween(1, 4),
      groupId: 1,
      method: '比率',
      paymentInfoArray: [
        {
          userId: 1,
          ratio: 0.25,
          amountEachMember: amount * 0.25,
        },
        {
          userId: 2,
          ratio: 0.25,
          amountEachMember: amount * 0.25,
        },
        {
          userId: 3,
          ratio: 0.25,
          amountEachMember: amount * 0.25,
        },
        {
          userId: 4,
          ratio: 0.25,
          amountEachMember: amount * 0.25,
        },
      ],
    };

    await transactionService.createWithTransaction(formData);
    await prismaService.$disconnect();
  });
};

const randomDate = (start: string, end: string): Date => {
  const startDate = dayjs(start).valueOf();
  const endDate = dayjs(end).valueOf();

  const randomMillis = Math.random() * (endDate - startDate) + startDate;
  const randomDate = dayjs(randomMillis).toDate();

  return randomDate;
};

const randomBool = () => {
  return Math.random() < 0.5;
};
