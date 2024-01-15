import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { PrismaService } from '@@nest/common/prisma/prisma.service';
import { GroupResponse } from './entities/group.entity';

@Injectable()
export class GroupService {
  constructor(
    private readonly prisma: PrismaService,
  ){}

  async create(createGroupDto: CreateGroupDto): Promise<GroupResponse> {
    return await this.prisma.group.create({
      data: createGroupDto
    });
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
