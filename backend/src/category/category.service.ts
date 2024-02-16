import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '@@nest/common/prisma/prisma.service';
import { Category, CategoryResponse } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.prisma.category.create({
      data: createCategoryDto,
    });
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
