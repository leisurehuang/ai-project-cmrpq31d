/**
 * 根模块
 * 装配：配置加载、Prisma、全局拦截器、4 大业务模块
 */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { configuration } from './config/configuration';
import { PrismaModule } from './prisma/prisma.module';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { AppController } from './app.controller';

// 业务模块
import { TasksModule } from './modules/tasks/tasks.module';
import { AuthModule } from './modules/auth/auth.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { StarsModule } from './modules/stars/stars.module';
import { ToysModule } from './modules/toys/toys.module';

@Module({
  imports: [
    // 全局配置加载
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    // 数据访问层
    PrismaModule,
    // 业务模块（对应方案的 4 大模块）
    AuthModule, // 用户与权限模块
    TasksModule, // 任务与积分模块（示例完整实现）
    StarsModule, // 星星流水（占位，IDE 接管）
    ToysModule, // 许愿池与兑换模块（占位）
    DashboardModule, // 儿童仪表盘模块（占位）
  ],
  controllers: [AppController],
  providers: [
    // 全局请求日志拦截器
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
  ],
})
export class AppModule {}
