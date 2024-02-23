import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PrismaService } from './common/prisma/prisma.service';
import { GroupModule } from './group/group.module';
import { MemberModule } from './member/member.module';
import { CategoryModule } from './category/category.module';
import { TransactionModule } from './transaction/transaction.module';
import { PaymentModule } from './payment/payment.module';
import { BalanceModule } from './balance/balance.module';
import { InviteModule } from './invite/invite.module';

@Module({
  imports: [
    UserModule,
    GroupModule,
    MemberModule,
    CategoryModule,
    TransactionModule,
    PaymentModule,
    BalanceModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    InviteModule,
  ],
  controllers: [],
  providers: [
    PrismaService,
  ],
})
export class AppModule { }
