import cron from 'node-cron';
import { prisma } from '@/app/lib/auth';

const BATCH_SIZE = 500;

async function deleteUnverifiedUsers() {
  const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);

  while (true) {
    const users = await prisma.user.findMany({
      where: { emailVerified: false, createdAt: { lt: twoDaysAgo } },
      select: { id: true },
      take: BATCH_SIZE,
    });

    if (users.length === 0) break;

    await prisma.user.deleteMany({
      where: { id: { in: users.map(u => u.id) } },
    });
  }
}

cron.schedule('0 0 * * *', async () => {
  try {
    await deleteUnverifiedUsers();
  } catch (err) {
    console.error('Cleanup job failed:', err);
  }
});