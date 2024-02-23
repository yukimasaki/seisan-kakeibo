import { Injectable } from '@nestjs/common';
import { UpdateInviteDto } from './dto/update-invite.dto';
import { RedisService } from 'src/common/redis/redis.service';
import { CreateRedisRecordDto } from 'src/common/redis/dto/create-redis.dto';

@Injectable()
export class InviteService {
  constructor(private readonly redisService: RedisService) {}

  async create(createInviteDto: CreateRedisRecordDto) {
    return await this.redisService.setValue(createInviteDto);
  }

  findAll() {
    return `This action returns all invite`;
  }

  async findOne(key: string) {
    return await this.redisService.findOne(key);
  }

  update(id: number, updateInviteDto: UpdateInviteDto) {
    return `This action updates a #${id} invite`;
  }

  async remove(key: string) {
    return await this.redisService.delete(key);
  }
}
