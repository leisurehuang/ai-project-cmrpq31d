/**
 * Prisma 模块（全局可用）
 * 将 PrismaService 注册为全局 Provider，业务模块无需重复 import
 */
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
