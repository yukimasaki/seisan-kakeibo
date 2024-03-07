import { Injectable } from '@nestjs/common';
import { UpdateBalanceDto } from './dto/update-balance.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreatePaymentDto } from 'src/payment/dto/create-payment.dto';
import { CreateBalanceDto } from './dto/create-balance.dto';

@Injectable()
export class BalanceService {
  constructor(private readonly prisma: PrismaService) {}

  createBalanceDto({
    createPaymentDto,
    transactionId,
  }: {
    createPaymentDto: CreatePaymentDto[];
    transactionId: number;
  }): CreateBalanceDto[] {
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
        return highPaymentUsers.map(
          (highPaymentUser) =>
            ({
              lenderId: highPaymentUser.payerId,
              borrowerId: lowPaymentUser.payerId,
              amount: Math.abs(lowPaymentUser.difference),
              status: `PENDING`,
              transactionId,
            }) satisfies CreateBalanceDto,
        );
      })
      .flat();

    return createBalanceDto;
  }

  async findAll() {
    return await this.prisma.balance.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.balance.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateBalanceDto: UpdateBalanceDto) {
    return await this.prisma.balance.update({
      where: { id },
      data: updateBalanceDto,
    });
  }
}
