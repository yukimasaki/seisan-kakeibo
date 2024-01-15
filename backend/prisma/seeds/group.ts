import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid';

const prisma = new PrismaClient();

export const deleteGroup = async () => {
  await prisma.group.deleteMany();
}

export const createGroup = async () => {
  await prisma.group.createMany({
    data: Array(1)
    .fill(0)
    .map((_, index) => {
      const uid: string = uuid();
      return {
        uid: uid.replaceAll(`-`, ``),
        displayName: `Group ${index}`,
      }
    }),
  });
}
