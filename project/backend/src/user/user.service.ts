import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '@dto/create-user.dto';
import { UpdateUserDto } from '@dto/update-user.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { User, UserResponse } from '@entity/user.entity';
import { AccessToken } from '@backend/interfaces/access-token.interface';
import { UtilityService } from 'src/common/services/utility.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly utilityService: UtilityService,
  ) {}

  async findMyProfile(bearerToken: string): Promise<UserResponse> {
    const accessToken: AccessToken = this.utilityService.decodeJwt(bearerToken);
    if (!accessToken) throw new BadRequestException();

    const keycloakUserId: string = accessToken['sub'];

    const user: UserResponse = await this.prisma.user.findUnique({
      where: {
        uuid: keycloakUserId,
      },
      include: {
        belongingGroups: {
          include: {
            user: true,
            group: true,
          },
        },
        activeGroup: {
          include: {
            members: {
              include: {
                user: true,
                group: true,
              },
            },
            creator: true,
          },
        },
      },
    });

    if (!user) throw new NotFoundException();
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<UserResponse> {
    const user: UserResponse = await this.prisma.user.create({
      data: createUserDto,
      include: {
        belongingGroups: {
          include: {
            user: true,
            group: true,
          },
        },
        activeGroup: {
          include: {
            members: {
              include: {
                user: true,
                group: true,
              },
            },
            creator: true,
          },
        },
      },
    });

    if (!user) throw new NotFoundException();
    return user;
  }

  async upsert(
    upsertUserDto: CreateUserDto | UpdateUserDto,
  ): Promise<UserResponse> {
    try {
      const user: UserResponse = await this.prisma.user.upsert({
        where: {
          uuid: upsertUserDto.uuid,
        },
        update: {
          userName: upsertUserDto.userName,
        },
        create: {
          uuid: upsertUserDto.uuid,
          email: upsertUserDto.email,
          userName: upsertUserDto.userName,
        },
        include: {
          belongingGroups: {
            include: {
              user: true,
              group: true,
            },
          },
          activeGroup: {
            include: {
              members: {
                include: {
                  user: true,
                  group: true,
                },
              },
              creator: true,
            },
          },
        },
      });

      if (!user) throw new NotFoundException();
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(): Promise<UserResponse[]> {
    const users: UserResponse[] = await this.prisma.user.findMany({
      include: {
        belongingGroups: {
          include: {
            user: true,
            group: true,
          },
        },
        activeGroup: {
          include: {
            members: {
              include: {
                user: true,
                group: true,
              },
            },
            creator: true,
          },
        },
      },
    });

    if (!users) throw new NotFoundException();
    return users;
  }

  async findById(id: number): Promise<UserResponse> {
    const user: UserResponse = await this.prisma.user.findUnique({
      where: { id },
      include: {
        belongingGroups: {
          include: {
            user: true,
            group: true,
          },
        },
        activeGroup: {
          include: {
            members: {
              include: {
                user: true,
                group: true,
              },
            },
            creator: true,
          },
        },
      },
    });

    if (!user) throw new NotFoundException();
    return user;
  }

  async findByEmail(email: string): Promise<UserResponse> {
    const user: UserResponse = await this.prisma.user.findUnique({
      where: { email },
      include: {
        belongingGroups: {
          include: {
            user: true,
            group: true,
          },
        },
        activeGroup: {
          include: {
            members: {
              include: {
                user: true,
                group: true,
              },
            },
            creator: true,
          },
        },
      },
    });

    if (!user) throw new NotFoundException();
    return user;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponse> {
    const user: UserResponse = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      include: {
        belongingGroups: {
          include: {
            user: true,
            group: true,
          },
        },
        activeGroup: {
          include: {
            members: {
              include: {
                user: true,
                group: true,
              },
            },
            creator: true,
          },
        },
      },
    });

    if (!user) throw new NotFoundException();
    return user;
  }

  async remove(id: number): Promise<UserResponse> {
    const user: UserResponse = await this.prisma.user.delete({
      where: { id },
      include: {
        belongingGroups: {
          include: {
            user: true,
            group: true,
          },
        },
        activeGroup: {
          include: {
            members: {
              include: {
                user: true,
                group: true,
              },
            },
            creator: true,
          },
        },
      },
    });

    if (!user) throw new NotFoundException();
    return user;
  }
}
