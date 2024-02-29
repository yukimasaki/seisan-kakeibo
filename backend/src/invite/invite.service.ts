import { BadRequestException, Injectable } from '@nestjs/common';
import { RedisService } from 'src/common/redis/redis.service';
import { CreateRedisRecordDto } from 'src/common/redis/dto/create-redis.dto';
import { v4 as uuid } from 'uuid';
import { CreateInviteDto } from './dto/create-invite.dto';
import { InviteResponse } from './entities/invite.entity';

@Injectable()
export class InviteService {
  constructor(private readonly redisService: RedisService) {}

  async create(createInviteDto: CreateInviteDto): Promise<InviteResponse> {
    const token = uuid();
    const { groupId } = createInviteDto;

    const createRedisRecordDto: CreateRedisRecordDto = {
      key: token,
      value: groupId.toString(),
      expires: 60 * 60 * 24,
    };

    try {
      await this.redisService.setValue(createRedisRecordDto);
      return { token, groupId };
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }

  async findOne(token: string): Promise<InviteResponse> {
    const groupId = parseInt(await this.redisService.findOne(token));
    return { token: token, groupId };
  }

  async remove(token: string) {
    return await this.redisService.delete(token);
  }
}
