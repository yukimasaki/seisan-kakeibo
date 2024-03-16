import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateMemberDto } from '@dto/create-member.dto';
import { UpdateMemberDto } from '@dto/update-member.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { MemberResponse } from '@entity/member.entity';

@Injectable()
export class MemberService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMemberDto: CreateMemberDto): Promise<MemberResponse> {
    try {
      const member: MemberResponse = await this.prisma.member.create({
        data: createMemberDto,
        include: {
          user: true,
          group: true,
        },
      });
      return member;
    } catch (error) {
      if ((error.code = 'P2002')) throw new ConflictException();
      throw new InternalServerErrorException();
    }
  }

  async findByGroupId(groupId: number): Promise<MemberResponse[]> {
    const members: MemberResponse[] = await this.prisma.member.findMany({
      where: {
        groupId,
      },
      include: {
        user: true,
        group: true,
      },
    });

    if (!members) throw new NotFoundException();
    return members;
  }

  async findByUserId(userId: number): Promise<MemberResponse[]> {
    const members: MemberResponse[] = await this.prisma.member.findMany({
      where: {
        userId,
      },
      include: {
        user: true,
        group: true,
      },
    });

    if (!members) throw new NotFoundException();
    return members;
  }

  async findOne(userId: number, groupId: number): Promise<MemberResponse> {
    const member: MemberResponse = await this.prisma.member.findUnique({
      where: {
        userId_groupId: {
          userId,
          groupId,
        },
      },
      include: {
        user: true,
        group: true,
      },
    });

    if (!member) throw new NotFoundException();
    return member;
  }

  async update(
    userId: number,
    groupId: number,
    updateMemberDto: UpdateMemberDto,
  ): Promise<MemberResponse> {
    const member: MemberResponse = await this.prisma.member.update({
      where: {
        userId_groupId: {
          userId,
          groupId,
        },
      },
      data: updateMemberDto,
      include: {
        user: true,
        group: true,
      },
    });

    if (!member) throw new NotFoundException();
    return member;
  }

  async remove(userId: number, groupId: number): Promise<MemberResponse> {
    const member: MemberResponse = await this.prisma.member.delete({
      where: {
        userId_groupId: {
          userId,
          groupId,
        },
      },
      include: {
        user: true,
        group: true,
      },
    });

    if (!member) throw new NotFoundException();
    return member;
  }
}
