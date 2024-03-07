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
    // reason: 他の誰かが負担している場合は、ユーザーの目的と異なるデータが渡っているため早期リターンする
    // 一人当たりの金額の合計と総額が等しいことを確認
    this.isDividedTotalEqualToAmount({ createTransactionComplex });

    // 一人当たりの比率の合計が1と等しいことを確認
    this.isTotalRatiosEqualToOne({ createTransactionComplex });

    const creatorId: number = createTransactionComplex.creatorId;
    const totalAmount: number = createTransactionComplex.amount;
    const creatorFinalBill: number = createTransactionComplex.member.find(
      (dto) => dto.userId === creatorId,
    ).finalBill;
    const creatorBalance: number = createTransactionComplex.member.find(
      (dto) => dto.userId === creatorId,
    ).balance;
    const creatorRatio: number = createTransactionComplex.member.find(
      (dto) => dto.userId === creatorId,
    ).ratio;

    // 作成者の比率が1と等しくない場合は例外をスロー
    if (creatorRatio !== 1)
      throw new BadRequestException('作成者のratioが1未満です');
    // 作成者の支払額と規定額が等しいこと
    if (creatorFinalBill !== creatorBalance)
      throw new BadRequestException('作成者のfinalBillとbalanceが一致しません');
    // 作成者の支払額と総額が等しいこと
    if (creatorFinalBill !== totalAmount)
      throw new BadRequestException('作成者のfinalBillと総額が一致しません');

    // すべてのバリデーションに通過したらtrueを返却
    return true;
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

    if (totalAmount !== dividedTotal)
      throw new BadRequestException(
        '一人当たりの金額の合計と総額が一致しません',
      );

    return true;
  }

  // 一人当たりの比率の合計が1と等しいことを確認する関数
  private isTotalRatiosEqualToOne({
    createTransactionComplex,
  }: {
    createTransactionComplex: CreateTransactionComplex;
  }): boolean {
    const totalRatios: number = createTransactionComplex.member.reduce(
      (acc, dto) => {
        if (dto.ratio === null || dto.ratio === undefined)
          throw new BadRequestException('ratioの指定が必要です');
        return acc + dto.ratio;
      },
      0,
    );

    if (totalRatios !== 1)
      throw new BadRequestException('一人当たりの比率の合計が1ではありません');

    return true;
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

      const createPaymentDto: CreatePaymentDto[] =
        createTransactionComplex.member.map((dto) => {
          return {
            payerId: dto.userId,
            finalBill: dto.finalBill,
            balance: dto.balance,
            difference: dto.finalBill - dto.balance,
            ratio: dto.ratio || null,
            transactionId,
          };
        });
      return createPaymentDto;
    }

    // 1-B. method=AMOUNT_BASIS の場合
    if (createTransactionComplex.method === 'AMOUNT_BASIS') {
      // 一人当たりの金額の合計と総額が等しいことを確認
      if (!this.isDividedTotalEqualToAmount({ createTransactionComplex }))
        throw new BadRequestException();

      const createPaymentDto: CreatePaymentDto[] =
        createTransactionComplex.member.map((dto) => {
          return {
            payerId: dto.userId,
            finalBill: dto.finalBill,
            balance: dto.balance,
            difference: dto.finalBill - dto.balance,
            ratio: dto.ratio || null,
            transactionId,
          };
        });
      return createPaymentDto;
    }

    // 1-C. その他 (method=RATIO または EVEN) の場合
    if (
      // 一人当たりの比率の合計が1と等しいことを確認
      !this.isTotalRatiosEqualToOne({ createTransactionComplex }) ||
      // 一人当たりの金額の合計と総額が等しいことを確認
      !this.isDividedTotalEqualToAmount({ createTransactionComplex })
    )
      throw new BadRequestException();

    const createPaymentDto: CreatePaymentDto[] =
      createTransactionComplex.member.map((dto) => {
        return {
          payerId: dto.userId,
          finalBill: dto.finalBill,
          balance: dto.balance,
          difference: dto.finalBill - dto.balance,
          ratio: dto.ratio || null,
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
