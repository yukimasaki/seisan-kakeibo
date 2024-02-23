import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateInviteDto } from './dto/update-invite.dto';
import { RedisService } from 'src/common/redis/redis.service';
import { CreateRedisRecordDto } from 'src/common/redis/dto/create-redis.dto';
import { v4 as uuid } from 'uuid';
import { CreateInviteDto } from './dto/create-invite.dto';

@Injectable()
export class InviteService {
  constructor(private readonly redisService: RedisService) {}

  async create(createInviteDto: CreateInviteDto): Promise<string> {
    const token = uuid();
    const { groupId } = createInviteDto;

    const createRedisRecordDto: CreateRedisRecordDto = {
      key: token,
      value: groupId.toString(),
      expires: 60 * 60 * 24,
    };

    try {
      await this.redisService.setValue(createRedisRecordDto);
      return token;
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
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
