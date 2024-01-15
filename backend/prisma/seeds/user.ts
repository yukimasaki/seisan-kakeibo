import { CreateUserDto } from '@@nest/user/dto/create-user.dto';
import { User } from '@@nest/user/entities/user.entity';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const deleteUser = async () => {
  await prisma.user.deleteMany();
}

export const createUser = async () => {
  const membership = [
    `free`,
    `premium`,
  ];

  const userCount = 4;

  const saltOrRounds = 10;
  const rawPassword = 'password';
  const hash = await bcrypt.hash(rawPassword, saltOrRounds);

  await prisma.user.createMany({
    data: Array.from({ length: userCount }, (_, index)=> ({
      email: `user${index + 1}@example.com`,
      displayName: `User ${index + 1}`,
      membership: membership[Math.floor(Math.random() * membership.length)],
      hashedPassword: hash,
    })),
  });
}
