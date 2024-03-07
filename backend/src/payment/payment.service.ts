import { Injectable } from '@nestjs/common';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateTransactionComplex } from 'src/transaction/dto/create-transaction.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  createPaymentDto({
    createTransactionComplex,
    transactionId,
  }: {
    createTransactionComplex: CreateTransactionComplex;
    transactionId: number;
  }): CreatePaymentDto[] {
    const totalAmount = createTransactionComplex.amount;
    switch (createTransactionComplex.method) {
      case 'RATIO':
        return createTransactionComplex.member.map((eachMember) => {
          const finalBill = eachMember.finalBill;
          const balance = Math.round(totalAmount * (eachMember.balance / 100));

          return {
            payerId: eachMember.userId,
            finalBill,
            balance,
            difference: finalBill - balance,
            ratio: eachMember.balance / 100,
            transactionId,
          };
        }) satisfies CreatePaymentDto[];
      default:
        // todo: ratio以外の場合の処理を書く
        return createTransactionComplex.member.map((eachMember) => {
          const finalBill = eachMember.finalBill;
          const balance = eachMember.balance;

          return {
            payerId: eachMember.userId,
            finalBill,
            balance,
            difference: finalBill - balance,
            ratio: eachMember.balance / 100,
            transactionId,
          };
        }) satisfies CreatePaymentDto[];
    }
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
