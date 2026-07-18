/**
 * 环境配置加载
 * 集中管理：端口 / 数据库 / JWT 三类令牌 / 限流
 */
export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',

  database: {
    url: process.env.DATABASE_URL,
  },

  // JWT 令牌体系（对应方案 authStrategy）
  jwt: {
    secret: process.env.JWT_SECRET || 'dev-secret-change-me',
    // 家长登录长效令牌
    parentExpiresIn: process.env.JWT_PARENT_EXPIRES || '7d',
    // 儿童免登长效令牌
    childExpiresIn: process.env.JWT_CHILD_EXPIRES || '30d',
    // 家长敏感操作（PIN 校验后）短效令牌
    pinExpiresIn: process.env.JWT_PIN_EXPIRES || '10m',
  },

  // 限流：单 IP 每分钟 100 次（对应方案 rateLimit）
  rateLimit: {
    ttl: 60,
    limit: 100,
  },
});
