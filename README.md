# 星星奖励系统 (Star Reward)

> 面向家庭场景的儿童行为激励与积分兑换 Web 系统。
> 家长发星/扣星，孩子查看进度与许愿池，线下完成玩具交付。

## 技术栈

- **前端**：Vue 3 + Vite + Tailwind CSS（步骤 2 生成）
- **后端**：Node.js + NestJS + TypeScript
- **数据库**：PostgreSQL（Prisma ORM）
- **部署**：Docker + Nginx

## 项目结构

```
star-reward/
├── backend/                # 后端服务 (NestJS)
│   ├── prisma/             # Prisma schema + seed
│   ├── src/
│   │   ├── common/         # 公共能力（过滤器/拦截器/DTO）
│   │   ├── config/         # 配置加载
│   │   ├── prisma/         # Prisma client 封装
│   │   ├── modules/        # 业务模块（按方案 4 大模块）
│   │   ├── app.module.ts   # 根模块
│   │   └── main.ts         # 应用入口
│   └── Dockerfile
├── frontend/               # 前端 (步骤 2 生成)
├── nginx/                  # Nginx 反向代理配置
├── docker-compose.yml      # 一键编排
└── README.md
```

## 快速开始

### 后端（独立启动）
```bash
cd backend
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed     # 可选：注入示例数据
npm run start:dev       # http://localhost:3000
```

Swagger 文档：http://localhost:3000/api/docs

### 一键启动（含数据库）
```bash
docker compose up -d
```
