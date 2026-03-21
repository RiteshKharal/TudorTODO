import cron from 'node-cron';
import { prisma } from '@/app/lib/auth';

cron.schedule('0 0 * * *', async () => {
  const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);

  const deletedUsers = await prisma.user.deleteMany({
    where: {
      emailVerified: false,
      createdAt: { lt: twoDaysAgo },
    },
  });
});