import { Injectable } from '@nestjs/common';
import { UpdateTransactionDto } from '@dto/update-transaction.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreatePaymentDto } from '@dto/create-payment.dto';
import { CreateBalanceDto } from '@dto/create-balance.dto';
import { TransactionResponse } from '@entity/transaction.entity';
import * as dayjs from 'dayjs';
import {
  CreateTransactionComplex,
  CreateTransactionDto,
} from '@dto/create-transaction.dto';
import { PaymentService } from 'src/payment/payment.service';
import { BalanceService } from 'src/balance/balance.service';

@Injectable()
export class TransactionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly paymentService: PaymentService,
    private readonly balanceService: BalanceService,
  ) {}

  createTransactionDto({
    createTransactionComplex,
  }: {
    createTransactionComplex: CreateTransactionComplex;
  }): CreateTransactionDto {
    const { member, ...createTransactionDto } = createTransactionComplex;
    return createTransactionDto;
  }

  async createWithTransaction(
    createTransactionComplex: CreateTransactionComplex,
  ) {
    // 1. Prismaのトランザクション処理を開始
    return await this.prisma.$transaction(async (prisma) => {
      // 2. CreateTransactionDtoを作成
      const createTransactionDto: CreateTransactionDto =
        this.createTransactionDto({ createTransactionComplex });

      // 3. transactionIdを取得
      const transactionResponse: TransactionResponse =
        await this.prisma.transaction.create({
          data: createTransactionDto,
        });
      const transactionId = transactionResponse.id;

      // 4. CreatePaymentDto[]を作成
      const createPaymentDto: CreatePaymentDto[] =
        this.paymentService.createPaymentDto({
          createTransactionComplex,
          transactionId,
        });

      // 5. CreateBalanceDto[]を作成
      const createBalanceDto: CreateBalanceDto[] =
        this.balanceService.createBalanceDto({
          createPaymentDto,
          transactionId,
        });

      await Promise.all([
        // 6. Paymentを作成
        await this.prisma.payment.createMany({
          data: createPaymentDto,
        }),
        // 7. Balanceを作成
        await this.prisma.balance.createMany({
          data: createBalanceDto,
        }),
      ]).catch((err) => {
        console.log(`トランザクション処理に失敗しました`);
        console.log(err);
      });

      return transactionResponse;
    });
  }

  async findByPaymentDate({
    start,
    end,
    groupId,
  }: {
    start: string;
    end: string;
    groupId: number;
  }) {
    const jst = -9;
    const queryStart = dayjs(start).add(jst, 'hour').toDate();
    const queryEnd = dayjs(end).add(jst, 'hour').toDate();

    const transactions = await this.prisma.transaction.findMany({
      include: {
        category: true,
      },
      where: {
        groupId,
        paymentDate: {
          gte: queryStart,
          lt: queryEnd,
        },
      },
    });

    return transactions;
  }

  async findOne(id: number) {
    return await this.prisma.transaction.findUnique({
      include: {
        category: true,
        payments: {
          include: {
            payer: true,
          },
        },
        balances: true,
      },
      where: {
        id,
      },
    });
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return await this.prisma.transaction.update({
      where: { id },
      data: updateTransactionDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.transaction.delete({
      where: { id },
    });
  }
}
