import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '@@nest/common/prisma/prisma.service';
import { CategoryResponse } from './entities/category.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.prisma.category.create({
      data: createCategoryDto,
    });
  }

  async createWithTransaction(createCategoryDto: CreateCategoryDto[]) {
    const batchPayload = await this.prisma.$transaction(async (prisma) => {
      const batchPayload: Prisma.BatchPayload =
        await this.prisma.category.createMany({
          data: createCategoryDto,
        });
      return batchPayload;
    });

    return batchPayload.count;
  }

  async findByGroupId(groupId: number): Promise<CategoryResponse[]> {
    const categories: CategoryResponse[] = await this.prisma.category.findMany({
      where: {
        groupId,
      },
    });
    if (!categories || categories.length === 0) throw new NotFoundException();
    return categories;
  }

  async findOne(id: number) {
    return await this.prisma.category.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return await this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.category.delete({
      where: { id },
    });
  }
}
