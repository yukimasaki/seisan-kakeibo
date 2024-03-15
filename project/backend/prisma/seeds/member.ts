import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const deleteMember = async () => {
  await prisma.member.deleteMany();
}

export const createMember = async () => {
  const userCount = await prisma.user.count();

  await prisma.member.createMany({
    data: Array(userCount)
    .fill(0)
    .map((_, index) => ({
      userId: index + 1,
      groupId: 1,
    })),
  });
}
