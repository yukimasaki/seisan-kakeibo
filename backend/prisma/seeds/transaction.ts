import { PrismaClient } from '@prisma/client';
import * as dayjs from 'dayjs';
import { CreatePaymentOmitTransactionId } from '@@nest/payment/dto/create-payment.dto';
import { CreateTransactionComplex, CreateTransactionSeedDto } from '@@nest/transaction/dto/create-transaction.dto';
import { randBetween } from '@@nest/utils/randBetween';
import { PrismaService } from '@@nest/common/prisma/prisma.service';
import { TransactionService } from '@@nest/transaction/transaction.service';
import { CreateBalanceOmitTransactionId } from '@@nest/balance/dto/create-balance.dto';

const prisma = new PrismaClient();

export const deleteTransaction = async () => {
  await prisma.transaction.deleteMany();
}

export const createTransaction = async () => {
  Array.from({ length: 30 }, async (_, index) => {
    const prismaService = new PrismaService();
    const transactionService = new TransactionService(prismaService);
    const createTransactionSeedDto: CreateTransactionSeedDto = {
      creatorId: 1,
      /** 取引の総額
       *  createTransactionSeedDto.amount: number
       */
      amount: randBetween(1000, 49999),
      paymentDate: randomDate('2023-08-01', '2023-10-31'),
      title: `取引 #${randBetween(1, 100)}`,
      memo: `備考`,
      status: `未精算`,
      categoryId: randBetween(1, 4),
      groupId: 1,
    }

    const method: string = `比率`;
    const ratio: number = 1 / 4;
    const userCount: number = await prisma.user.count();

    /** メンバーの既定の支払額
     *  memberDefaultAmount: number
    */
    const memberDefaultAmount: number = Math.round(createTransactionSeedDto.amount * ratio);

    /** メンバーの実際の支払額
     *  memberActualAmounts: number[]
     */
    const memberActualAmounts: number[] = Array.from({ length: userCount - 1 }, (_, index) => {
      /** 立替えの有無
       *  isDebt: boolean
       */
      const isDebt: boolean = randomBool();

      const maxDebt: number = Math.round(createTransactionSeedDto.amount / userCount);
      return !isDebt ?
        Math.round(createTransactionSeedDto.amount * ratio) :
        Math.round(createTransactionSeedDto.amount * ratio) - randBetween(1, maxDebt);
    });

    /** メンバーの実際の支払額の総額
     *  memberTotalActualAmount: number
     */
    const init = 0;
    const memberTotalActualAmount: number = memberActualAmounts.reduce((accumulator, currentValue) =>
      accumulator + currentValue, init
    );

    /** リーダーの既定の支払額
     *  leaderDefaultAmount: number
    */
    const leaderDefaultAmount: number = createTransactionSeedDto.amount - memberDefaultAmount * (userCount - 1);

    /** リーダーの実際の支払額
     *  leaderActualAmount: number
     */
    const leaderActualAmount: number = createTransactionSeedDto.amount - memberTotalActualAmount;

    const createPaymentOmitTransactionId: CreatePaymentOmitTransactionId[] =
      Array.from({ length: userCount }, (_, index) => (
        {
          payerId: index + 1,
          actualPaymentAmount: index === 0 ? leaderActualAmount : memberActualAmounts[index - 1],
          defaultPaymentAmount: index === 0 ? leaderDefaultAmount : memberDefaultAmount,
          difference: index === 0 ? leaderActualAmount - leaderDefaultAmount : memberActualAmounts[index - 1] - memberDefaultAmount,
          method,
          ratio,
        }
      ));

    // 規定額より支払いが多いユーザーを抽出
    const highPaymentUsers = createPaymentOmitTransactionId.filter(payment =>
      payment.actualPaymentAmount > payment.defaultPaymentAmount
    );

    // 規定額より支払いが少ないユーザーを抽出
    const lowPaymentUsers = createPaymentOmitTransactionId.filter(payment =>
      payment.actualPaymentAmount < payment.defaultPaymentAmount
    );

    // 支払いが多いユーザー・支払いが少ないユーザーごとにループ処理で賃借記録を作成する
    const createBalanceOmitTransactionId: CreateBalanceOmitTransactionId[] =
      lowPaymentUsers.map(lowPaymentUser => {
        return highPaymentUsers.map(highPaymentUser => ({
          lenderId: highPaymentUser.payerId,
          borrowerId: lowPaymentUser.payerId,
          amount: Math.abs(lowPaymentUser.difference),
          status: `未精算`,
        }));
      }).flat();

    const createTransactionComplex: CreateTransactionComplex = {
      createTransactionSeedDto,
      createPaymentOmitTransactionId,
      createBalanceOmitTransactionId,
    }

    // await transactionService.createWithTransaction(createTransactionComplex);
    await prismaService.$disconnect();
  });
}

const randomDate = (
  start: string,
  end: string,
): Date => {
  const startDate = dayjs(start).valueOf();
  const endDate = dayjs(end).valueOf();

  const randomMillis = Math.random() * (endDate - startDate) + startDate;
  const randomDate = dayjs(randomMillis).toDate();

  return randomDate;
}

const randomBool = () => {
  return Math.random() < 0.5;
}
