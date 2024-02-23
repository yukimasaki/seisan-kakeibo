import { Module } from '@nestjs/common';
import { InviteService } from './invite.service';
import { InviteController } from './invite.controller';
import { RedisService } from '@@nest/common/redis/redis.service';

@Module({
  controllers: [InviteController],
  providers: [InviteService, RedisService],
})
export class InviteModule {}
