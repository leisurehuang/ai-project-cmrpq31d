/**
 * 种子数据：注入示例家长 / 儿童 / 任务 / 玩具
 * 运行：npm run prisma:seed
 */
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 开始注入种子数据...');

  // 1. 创建示例家长（用户名 demo_parent / 密码 parent123 / PIN 1234）
  const passwordHash = await bcrypt.hash('parent123', 10);
  const pinCodeHash = await bcrypt.hash('1234', 10);

  const parent = await prisma.parent.upsert({
    where: { username: 'demo_parent' },
    update: {},
    create: {
      username: 'demo_parent',
      passwordHash,
      pinCodeHash,
      children: {
        create: [
          { name: '小宝', totalStars: 20 },
          { name: '甜甜', totalStars: 50 },
        ],
      },
    },
  });

  const children = await prisma.child.findMany({ where: { parentId: parent.id } });
  const [child] = children;

  if (child) {
    // 2. 示例任务
    await prisma.task.createMany({
      data: [
        { childId: child.id, title: '按时起床', starValue: 3 },
        { childId: child.id, title: '完成作业', starValue: 5 },
        { childId: child.id, title: '帮忙做家务', starValue: 4 },
      ],
      skipDuplicates: true,
    });

    // 3. 示例许愿池玩具
    await prisma.toy.createMany({
      data: [
        { childId: child.id, name: '乐高积木', requiredStars: 100 },
        { childId: child.id, name: '小恐龙玩具', requiredStars: 50 },
        { childId: child.id, name: '绘本套装', requiredStars: 30 },
      ],
      skipDuplicates: true,
    });
  }

  console.log('✅ 种子数据注入完成');
  console.log('   家长账号: demo_parent / parent123');
  console.log('   操作 PIN: 1234');
}

main()
  .catch((e) => {
    console.error('❌ 种子数据注入失败:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
