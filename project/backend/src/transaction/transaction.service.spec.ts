import { PrismaService } from 'src/common/prisma/prisma.service';
import {
  CreateTransactionComplex,
  CreateTransactionDto,
} from './dto/create-transaction.dto';
import { TransactionService } from './transaction.service';
import { PaymentService } from 'src/payment/payment.service';
import { BalanceService } from 'src/balance/balance.service';

const prismaService = new PrismaService();
const paymentService = new PaymentService(prismaService);
const balanceService = new BalanceService(prismaService);
const transactionService = new TransactionService(
  prismaService,
  paymentService,
  balanceService,
);

describe('createTransactionDto', () => {
  test('関数にcreateTransactionComplexを渡すと、createTransactionDtoを返すこと', () => {
    const createTransactionComplex: CreateTransactionComplex = {
      // CreateTransactionDto
      creatorId: 1,
      amount: 1000,
      paymentDate: new Date(),
      title: 'テストデータ',
      memo: 'テストです。',
      status: 'PENDING',
      method: 'RATIO',
      categoryId: 1,
      groupId: 1,

      // BalanceInput
      member: [
        { userId: 1, finalBill: 250, balance: 500 },
        { userId: 2, finalBill: 750, balance: 500 },
      ],
    };

    const createTransactionDto: CreateTransactionDto =
      transactionService.createTransactionDto({
        createTransactionComplex,
      });

    expect(createTransactionDto).toHaveProperty('creatorId');
    expect(createTransactionDto).toHaveProperty('amount');
    expect(createTransactionDto).toHaveProperty('paymentDate');
    expect(createTransactionDto).toHaveProperty('title');
    expect(createTransactionDto).toHaveProperty('memo');
    expect(createTransactionDto).toHaveProperty('status');
    expect(createTransactionDto).toHaveProperty('method');
    expect(createTransactionDto).toHaveProperty('categoryId');
    expect(createTransactionDto).toHaveProperty('groupId');
  });
});
