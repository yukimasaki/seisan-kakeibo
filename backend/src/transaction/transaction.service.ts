import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from '@@nest/common/prisma/prisma.service';
import { CreatePaymentDto } from '@@nest/payment/dto/create-payment.dto';
import { CreateBalanceDto } from '@@nest/balance/dto/create-balance.dto';
import { TransactionResponse } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async createWithTransaction(
    createTransactionDto: CreateTransactionDto,
  ) {

    // 1. Prismaのトランザクション処理を開始
    return await this.prisma.$transaction(async (prisma) => {
      // 2. Transactionを作成
      const transaction: TransactionResponse = await this.prisma.transaction.create({
        data: createTransactionDto
      });

      // todo: フロントエンドから渡されてきたCreateTransactionDtoオブジェクトをトランザクション処理に利用できる形式に変換する処理を書く
      // 3. transactionIdを取得
      const transactionId = transaction.id;

      // 4. CreatePaymentDto[]を作成
      const totalActualPaymentAmount: number = createTransactionDto.amount;
      const createPaymentDto: CreatePaymentDto[] = createTransactionDto.paymentInfoArray.map(
        paymentInfo => ({
          payerId: paymentInfo.userId,
          actualPaymentAmount: paymentInfo.amountEachMember,
          defaultPaymentAmount: Math.round(totalActualPaymentAmount * paymentInfo.ratio),
          difference: (paymentInfo.amountEachMember) - Math.round(totalActualPaymentAmount * paymentInfo.ratio),
          method: createTransactionDto.method,
          ratio: paymentInfo.ratio,
          transactionId,
        }));

      // 5. CreateBalanceDto[]を作成

      // APIへのアクセスをPromise.allで並列処理し高速化する
      Promise.all([
        // 6. Paymentを作成
        await this.prisma.payment.createMany({
          data: createPaymentDto
        }),
        // 7. Balanceを作成
        // await this.prisma.balance.createMany({
        //   data: createBalanceDto
        // }),
      ])
        .catch(err => {
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

  async findByPaymentDate(
    start: string,
    end: string,
  ) {
    return await this.prisma.transaction.findMany({
      include: {
        category: true,
      },
      where: {
        paymentDate: {
          gte: new Date(start),
          lt: new Date(end),
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.transaction.findUnique({
      where: { id }
    });
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return await this.prisma.transaction.update({
      where: { id },
      data: updateTransactionDto
    });
  }

  async remove(id: number) {
    return await this.prisma.transaction.delete({
      where: { id }
    });
  }
}
