import { Injectable } from '@nestjs/common';
import { CreateInviteDto } from './dto/create-invite.dto';
import { UpdateInviteDto } from './dto/update-invite.dto';
import { RedisService } from '@@nest/common/redis/redis.service';

@Injectable()
export class InviteService {
  constructor(private readonly redisService: RedisService) {}

  create(createInviteDto: CreateInviteDto) {
    return 'This action adds a new invite';
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

  remove(id: number) {
    return `This action removes a #${id} invite`;
  }
}
