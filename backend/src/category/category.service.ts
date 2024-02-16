import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '@@nest/common/prisma/prisma.service';
import { CategoryResponse } from './entities/category.entity';
import { AccessToken } from '@@nest/common/interfaces/access-token.interface';
import { UtilityService } from '@@nest/common/services/utility.service';

@Injectable()
export class CategoryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly utilityService: UtilityService,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.prisma.category.create({
      data: createCategoryDto,
    });
  }

  async findByMyGroupId(bearerToken: string): Promise<CategoryResponse[]> {
    const accessToken: AccessToken = this.utilityService.decodeJwt(bearerToken);
    if (!accessToken) throw new BadRequestException();

    const myGroupId: number = accessToken['profile'].activeGroupId;

    const categories: CategoryResponse[] = await this.prisma.category.findMany({
      where: {
        groupId: myGroupId,
      },
    });
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
