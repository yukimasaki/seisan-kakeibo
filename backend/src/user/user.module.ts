import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '@@nest/common/prisma/prisma.service';
import { UtilityService } from '@@nest/common/services/utility.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, JwtService, UtilityService],
})
export class UserModule {}
