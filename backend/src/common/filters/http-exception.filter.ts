/**
 * 全局异常过滤器
 * 统一错误响应结构：{ code, message, path, timestamp }
 */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // 状态码判定
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // 错误信息提取
    let message: unknown = '服务器内部错误';
    if (exception instanceof HttpException) {
      const res = exception.getResponse();
      message = typeof res === 'string' ? res : (res as any).message ?? res;
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    // 记录错误日志（含堆栈）
    this.logger.error(
      `[${request.method}] ${request.url} => ${status}`,
      exception instanceof Error ? exception.stack : undefined,
    );

    // 统一响应结构
    response.status(status).json({
      code: status,
      message: Array.isArray(message) ? message.join('; ') : message,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
