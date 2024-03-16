import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RedisService } from 'src/common/redis/redis.service';
import { v4 as uuid } from 'uuid';
import { CreateInviteDto } from '@dto/create-invite.dto';
import {
  CreateInviteResponse,
  FindInviteResponse,
} from '@entity/invite.entity';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateRedisRecordDto } from 'src/common/redis/dto/create-redis.dto';
import { GroupResponse } from '@entity/group.entity';

@Injectable()
export class InviteService {
  constructor(
    private readonly redisService: RedisService,
    private readonly prismaService: PrismaService,
  ) {}

  async create(
    createInviteDto: CreateInviteDto,
  ): Promise<CreateInviteResponse> {
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

  async findOne(token: string): Promise<FindInviteResponse> {
    const groupId = parseInt(await this.redisService.findOne(token));
    if (isNaN(groupId)) throw new NotFoundException();

    const groupResponse: GroupResponse | null =
      await this.prismaService.group.findUnique({
        where: { id: groupId },
        include: {
          members: true,
          creator: true,
        },
      });

    if (!groupResponse) throw new NotFoundException();
    return { token, groupId, group: groupResponse };
  }

  async remove(token: string) {
    return await this.redisService.delete(token);
  }
}
