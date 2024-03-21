import { PrismaClient } from '@prisma/client';
import * as dayjs from 'dayjs';
import { randBetween } from 'src/utils/randBetween';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { TransactionService } from 'src/transaction/transaction.service';
import { PaymentService } from 'src/payment/payment.service';
import { BalanceService } from 'src/balance/balance.service';
import { CreateTransactionComplex } from '@dto/create-transaction.dto';

const prisma = new PrismaClient();

export const deleteTransaction = async () => {
  await prisma.transaction.deleteMany();
};

export const createTransaction = async () => {
  Array.from({ length: 30 }, async (_, index) => {
    const prismaService = new PrismaService();
    const paymentService = new PaymentService(prismaService);
    const balanceService = new BalanceService(prismaService);

    const transactionService = new TransactionService(
      prismaService,
      paymentService,
      balanceService,
    );

    const amount = randBetween(1000, 49999);

    const start = dayjs().startOf('year').format('YYYY-MM-DD');
    const end = dayjs().endOf('month').format('YYYY-MM-DD');

    const formData: CreateTransactionComplex = {
      creatorId: 1,
      amount,
      paymentDate: randomDate(start, end),
      title: `取引 #${randBetween(1, 100)}`,
      memo: `備考`,
      status: `PENDING`,
      categoryId: randBetween(1, 4),
      groupId: 1,
      method: 'RATIO',
      member: [
        {
          userId: 1,
          ratio: 0.25,
          balance: null,
          finalBill: amount * 0.25,
        },
        {
          userId: 2,
          ratio: 0.25,
          balance: null,
          finalBill: amount * 0.25,
        },
        {
          userId: 3,
          ratio: 0.25,
          balance: null,
          finalBill: amount * 0.25,
        },
        {
          userId: 4,
          ratio: 0.25,
          balance: null,
          finalBill: amount * 0.25,
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
