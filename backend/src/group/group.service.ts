import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupAndMemberDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { PrismaService } from '@@nest/common/prisma/prisma.service';
import { GroupResponse } from './entities/group.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GroupService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createGroupAndMemberDto: CreateGroupAndMemberDto,
  ): Promise<GroupResponse> {
    // トランザクション処理
    const group: GroupResponse = await this.prisma.$transaction(
      async (prisma) => {
        // reason: groupIdが必要なので先にグループを作成する
        const group = await this.prisma.group.create({
          data: {
            displayName: createGroupAndMemberDto.displayName,
            uuid: uuidv4() as string,
          },
          include: {
            members: true,
          },
        });

        const member = await this.prisma.member.create({
          data: {
            userId: createGroupAndMemberDto.userId,
            groupId: group.id,
          },
        });

        const groupWithMembers = await this.prisma.group.findUnique({
          where: {
            id: group.id,
          },
          include: {
            members: true,
          },
        });

        // todo: カテゴリーをデフォルト値から作成する

        return groupWithMembers;
      },
    );

    return group;
  }

  async findAll(): Promise<GroupResponse[]> {
    const groups: GroupResponse[] = await this.prisma.group.findMany({
      include: { members: true },
    });

    if (!groups) throw new NotFoundException();
    return groups;
  }

  async findOne(id: number): Promise<GroupResponse> {
    const group: GroupResponse = await this.prisma.group.findUnique({
      where: { id },
      include: { members: true },
    });

    if (!group) throw new NotFoundException();
    return group;
  }

  async update(
    id: number,
    updateGroupDto: UpdateGroupDto,
  ): Promise<GroupResponse> {
    const group: GroupResponse = await this.prisma.group.update({
      where: { id },
      include: { members: true },
      data: updateGroupDto,
    });

    if (!group) throw new NotFoundException();
    return group;
  }

  async remove(id: number): Promise<GroupResponse> {
    const group: GroupResponse = await this.prisma.group.delete({
      where: { id },
      include: { members: true },
    });

    if (!group) throw new NotFoundException();
    return group;
  }
}
