/**
 * 应用入口
 * - 注册全局管道（DTO 校验）
 * - 注册全局过滤器（统一错误响应）
 * - 注册全局拦截器（请求日志）
 * - 挂载 Swagger 文档
 */
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // 全局 API 前缀（对应方案 baseUrl: /api/v1）
  app.setGlobalPrefix('api/v1');

  // 全局 DTO 校验管道
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 自动剔除 DTO 未声明的字段
      transform: true, // 自动类型转换
      forbidNonWhitelisted: true, // 出现未声明字段直接报错
    }),
  );

  // 全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  // 全局日志拦截器
  app.useGlobalInterceptors(new LoggingInterceptor());

  // CORS（开发期前端直连）
  app.enableCors({ origin: true, credentials: true });

  // Swagger API 文档
  const swaggerConfig = new DocumentBuilder()
    .setTitle('星星奖励系统 API')
    .setDescription('家庭儿童行为激励与积分兑换系统 - 接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  SwaggerModule.setup('api/docs', app, SwaggerModule.createDocument(app, swaggerConfig));

  const port = configService.get<number>('port', 3000);
  await app.listen(port);

  Logger.log(`🚀 后端服务已启动: http://localhost:${port}`, 'Bootstrap');
  Logger.log(`📖 Swagger 文档:  http://localhost:${port}/api/docs`, 'Bootstrap');
}

bootstrap();
