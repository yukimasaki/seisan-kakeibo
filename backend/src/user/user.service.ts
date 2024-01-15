import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '@@nest/common/prisma/prisma.service';
import { User, UserResponse } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<UserResponse> {
    return await this.prisma.user.create({
      data: createUserDto
    });
  }

  async findAll(): Promise<UserResponse[] | null> {
    return await this.prisma.user.findMany();
  }

  async findById(id: number) {
    return await this.prisma.user.findUnique({
      where: { id },
      include: {
        members: {
          include: {
            group: true,
          }
        },
      },
    });
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        members: {
          include: {
            group: true,
          }
        },
      },
    });

    if (!user) throw new NotFoundException;
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserResponse> {
    return await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number): Promise<UserResponse> {
    const currentUser: User = await this.findById(id);
    if (!currentUser) throw new NotFoundException;

    try {
      const user = await this.prisma.user.delete({
        where: { id }
      });
      return user;
    } catch (error) {
      throw new InternalServerErrorException;
    }
  }
}
