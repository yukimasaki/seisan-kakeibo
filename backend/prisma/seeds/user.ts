import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

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
    data: Array.from({ length: userCount }, (_, index) => ({
      uuid: uuid(),
      email: `user${index + 1}@example.com`,
      userName: `User ${index + 1}`,
      membership: membership[Math.floor(Math.random() * membership.length)],
      hashedPassword: hash,
    })),
  });
}
