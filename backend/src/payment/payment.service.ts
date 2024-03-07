import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateTransactionComplex } from 'src/transaction/dto/create-transaction.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  // [必要な関数]
  // 作成者が全額負担していることを確認する関数
  private isCreatorFullyPaying({
    createTransactionComplex,
  }: {
    createTransactionComplex: CreateTransactionComplex;
  }): boolean {
    const creatorId: number = createTransactionComplex.creatorId;
    const totalAmount: number = createTransactionComplex.amount;
    const creatorFinalBill: number = createTransactionComplex.member.find(
      (dto) => dto.userId === creatorId,
    ).finalBill;

    return totalAmount === creatorFinalBill;
  }

  // 一人当たりの金額の合計と総額が等しいことを確認する関数
  private isDividedTotalEqualToAmount({
    createTransactionComplex,
  }: {
    createTransactionComplex: CreateTransactionComplex;
  }): boolean {
    const totalAmount: number = createTransactionComplex.amount;
    const dividedTotal: number = createTransactionComplex.member.reduce(
      (acc, dto) => acc + dto.finalBill,
      0,
    );

    return totalAmount === dividedTotal;
  }

  // 一人当たりの比率の合計が1と等しいことを確認する関数
  private isTotalRatiosEqualToOne({
    createTransactionComplex,
  }: {
    createTransactionComplex: CreateTransactionComplex;
  }): boolean {
    const totalRatios: number = createTransactionComplex.member.reduce(
      (acc, dto) => {
        if (!dto.ratio) throw new BadRequestException();
        return acc + dto.ratio;
      },
      0,
    );
    return totalRatios === 1;
  }

  createPaymentDto({
    createTransactionComplex,
    transactionId,
  }: {
    createTransactionComplex: CreateTransactionComplex;
    transactionId: number;
  }): CreatePaymentDto[] {
    // 1. バリデーション
    // 1-A. 人数=1 または method=NONE の場合
    if (
      createTransactionComplex.member.length === 1 ||
      createTransactionComplex.method === 'NONE'
    ) {
      // 作成者が全額負担していることを確認
      if (!this.isCreatorFullyPaying({ createTransactionComplex }))
        throw new BadRequestException();
    }

    // 1-B. method=AMOUNT_BASIS の場合
    if (createTransactionComplex.method === 'AMOUNT_BASIS') {
      // 一人当たりの金額の合計と総額が等しいことを確認
      if (!this.isDividedTotalEqualToAmount({ createTransactionComplex }))
        throw new BadRequestException();
    }

    // 1-C. その他 (method=RATIO または EVEN) の場合
    if (
      // 一人当たりの比率の合計が1と等しいことを確認
      !this.isTotalRatiosEqualToOne({ createTransactionComplex }) ||
      // 一人当たりの金額の合計と総額が等しいことを確認
      !this.isDividedTotalEqualToAmount({ createTransactionComplex })
    )
      throw new BadRequestException();

    // 2. バリデーションに通過したらデータを返却する
    const createPaymentDto: CreatePaymentDto[] =
      createTransactionComplex.member.map((dto) => {
        return {
          payerId: dto.userId,
          finalBill: dto.finalBill,
          balance: dto.balance,
          difference: dto.finalBill - dto.balance,
          transactionId,
        };
      });

    return createPaymentDto;
  }

  async findAll() {
    return await this.prisma.payment.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.payment.findUnique({
      where: { id },
    });
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return await this.prisma.payment.update({
      where: { id },
      data: updatePaymentDto,
    });
  }
}
