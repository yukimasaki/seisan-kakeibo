import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaService } from '@@nest/common/prisma/prisma.service';
import { UtilityService } from '@@nest/common/services/utility.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService, JwtService, UtilityService],
})
export class CategoryModule {}
