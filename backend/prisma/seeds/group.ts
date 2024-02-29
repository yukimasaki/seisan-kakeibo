import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export const deleteGroup = async () => {
  await prisma.group.deleteMany();
};

export const createGroup = async () => {
  await prisma.group.createMany({
    data: Array(1)
      .fill(0)
      .map((_, index) => {
        const uuid: string = uuidv4();
        return {
          uuid,
          displayName: `Group ${index}`,
        };
      }),
  });
};
