import { Injectable } from '@nestjs/common';
import { CreateGroupAndMemberDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { PrismaService } from '@@nest/common/prisma/prisma.service';
import { GroupResponse } from './entities/group.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GroupService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async create(createGroupAndMemberDto: CreateGroupAndMemberDto): Promise<GroupResponse> {
    // トランザクション処理
    const group: GroupResponse = await this.prisma.$transaction(async (prisma) => {
      // reason: groupIdが必要なので先にグループを作成する
      const group = await this.prisma.group.create({
        data: {
          displayName: createGroupAndMemberDto.displayName,
          uuid: uuidv4() as string,
        },
      });

      const member = await this.prisma.member.create({
        data: {
          userId: createGroupAndMemberDto.userId,
          groupId: group.id,
        },
      });

      return group;
    });

    return group;
  }

  async findAll(): Promise<GroupResponse[] | null> {
    return await this.prisma.group.findMany();
  }

  async findOne(id: number): Promise<GroupResponse | null> {
    return await this.prisma.group.findUnique({
      where: { id }
    });
  }

  async update(id: number, updateGroupDto: UpdateGroupDto): Promise<GroupResponse> {
    return await this.prisma.group.update({
      where: { id },
      data: updateGroupDto
    });
  }

  async remove(id: number): Promise<GroupResponse> {
    return await this.prisma.group.delete({
      where: { id }
    });
  }
}
