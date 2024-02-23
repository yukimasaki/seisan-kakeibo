import { Injectable } from '@nestjs/common';
import { UpdateBalanceDto } from './dto/update-balance.dto';
import { PrismaService } from '@@nest/common/prisma/prisma.service';

@Injectable()
export class BalanceService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.balance.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.balance.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateBalanceDto: UpdateBalanceDto) {
    return await this.prisma.balance.update({
      where: { id },
      data: updateBalanceDto,
    });
  }
}
