import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { PaymentService } from 'src/payment/payment.service';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService, PrismaService, PaymentService],
})
export class TransactionModule {}
