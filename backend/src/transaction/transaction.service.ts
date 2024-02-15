import { Injectable } from '@nestjs/common';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from '@@nest/common/prisma/prisma.service';
import { CreatePaymentDto } from '@@nest/payment/dto/create-payment.dto';
import { CreateBalanceDto } from '@@nest/balance/dto/create-balance.dto';
import { TransactionResponse } from './entities/transaction.entity';
import * as dayjs from 'dayjs';
import { CreateTransactionDto } from '@@nest/transaction/dto/create-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async createWithTransaction(createTransactionDto: CreateTransactionDto) {
    // 1. Prismaのトランザクション処理を開始
    return await this.prisma.$transaction(async (prisma) => {
      // 2. Transactionを作成
      const { member, method, ...commonInput } = createTransactionDto;

      const transaction: TransactionResponse =
        await this.prisma.transaction.create({
          data: commonInput,
        });

      // todo: フロントエンドから渡されてきたcreateTransactionDtoをトランザクション処理に利用できる形式に変換する処理を書く
      // 3. transactionIdを取得
      const transactionId = transaction.id;

      // 4. CreatePaymentDto[]を作成
      const totalAmount = createTransactionDto.amount;

      const createPaymentDto: CreatePaymentDto[] = (() => {
        switch (method) {
          case 'ratio':
            return createTransactionDto.member.map((eachMember) => {
              const actualPaymentAmount = eachMember.finalBill;
              const defaultPaymentAmount = Math.round(
                totalAmount * (eachMember.balance / 100),
              );

              return {
                payerId: eachMember.userId,
                actualPaymentAmount,
                defaultPaymentAmount,
                difference: actualPaymentAmount - defaultPaymentAmount,
                method,
                ratio: eachMember.balance / 100,
                transactionId,
              };
            }) satisfies CreatePaymentDto[];
          default:
            // todo: ratio以外の場合の処理を書く
            return createTransactionDto.member.map((eachMember) => {
              const actualPaymentAmount = eachMember.finalBill;
              const defaultPaymentAmount = eachMember.balance;

              return {
                payerId: eachMember.userId,
                actualPaymentAmount,
                defaultPaymentAmount,
                difference: actualPaymentAmount - defaultPaymentAmount,
                method,
                ratio: eachMember.balance / 100,
                transactionId,
              };
            }) satisfies CreatePaymentDto[];
        }
      })();

      // 5. CreateBalanceDto[]を作成
      // 規定額より支払いが多いユーザーを抽出
      const highPaymentUsers = createPaymentDto.filter(
        (payment) => payment.actualPaymentAmount > payment.defaultPaymentAmount,
      );

      // 規定額より支払いが少ないユーザーを抽出
      const lowPaymentUsers = createPaymentDto.filter(
        (payment) => payment.actualPaymentAmount < payment.defaultPaymentAmount,
      );

      // 支払いが多いユーザー・支払いが少ないユーザーごとにループ処理で賃借記録を作成する
      const createBalanceDto: CreateBalanceDto[] = lowPaymentUsers
        .map((lowPaymentUser) => {
          return highPaymentUsers.map((highPaymentUser) => ({
            lenderId: highPaymentUser.payerId,
            borrowerId: lowPaymentUser.payerId,
            amount: Math.abs(lowPaymentUser.difference),
            status: `未精算`,
            transactionId,
          }));
        })
        .flat();

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

      return transaction;
    });
  }

  // async findAll() {
  //   return await this.prisma.transaction.findMany({
  //     include: {
  //       category: true,
  //     },
  //   });
  // }

  async findByPaymentDate(start: string, end: string) {
    const jst = -9;
    const queryStart = dayjs(start).add(jst, 'hour').toDate();
    const queryEnd = dayjs(end).add(jst, 'hour').toDate();

    const transactions = await this.prisma.transaction.findMany({
      include: {
        category: true,
      },
      where: {
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
