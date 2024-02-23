import { Module } from '@nestjs/common';
import { InviteService } from './invite.service';
import { InviteController } from './invite.controller';
import { RedisService } from 'src/common/redis/redis.service';

@Module({
  controllers: [InviteController],
  providers: [InviteService, RedisService],
})
export class InviteModule {}
