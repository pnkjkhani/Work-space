import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const connectToPrismaDatabase = async () => {
    try {
        await prisma.$connect();
    } catch (error) {
        throw new Error('Unable to connect prisma db')
    }
  };

