/**
 * 用户与权限模块（占位）
 *
 * 待 IDE 实现：
 *   - POST /api/v1/auth/login         家长账号密码登录
 *   - POST /api/v1/auth/verify-pin    敏感操作前 PIN 码校验
 *   - JWT Strategy / Guard
 *   - PIN-Token Strategy / Guard（短效令牌）
 *   - Child-Token 生成（家长为儿童签发免登长效令牌）
 */
import { Module } from '@nestjs/common';

@Module({})
export class AuthModule {}
