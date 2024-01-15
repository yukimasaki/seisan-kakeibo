import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PrismaService } from '@@nest/common/prisma/prisma.service';
import { MemberResponse } from './entities/member.entity';

@Injectable()
export class MemberService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async create(createMemberDto: CreateMemberDto): Promise<MemberResponse> {
    return await this.prisma.member.create({
      data: createMemberDto
    });
  }

  async findByGroupId(
    groupId: number,
  ): Promise<MemberResponse[] | null> {
    return await this.prisma.member.findMany({
      where: {
        groupId,
      },
      include: {
        user: true,
      },
    });
  }

  async findOne(userId: number, groupId: number) {
    return await this.prisma.member.findUnique({
      where: {
        userId_groupId: {
          userId,
          groupId,
        }
      },
      include: {
        user: true,
      },
    });
  }

  async update(userId: number, groupId: number, updateMemberDto: UpdateMemberDto) {
    return await this.prisma.member.update({
      where: {
        userId_groupId: {
          userId,
          groupId,
        }
      },
      data: updateMemberDto
    });
  }

  async remove(userId: number, groupId: number) {
    return await this.prisma.member.delete({
      where: {
        userId_groupId: {
          userId,
          groupId,
        }
      }
    });
  }
}
