import { Module } from '@nestjs/common';
import { InviteService } from './invite.service';
import { InviteController } from './invite.controller';
import { RedisService } from 'src/common/redis/redis.service';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  controllers: [InviteController],
  providers: [InviteService, RedisService, PrismaService],
})
export class InviteModule {}
