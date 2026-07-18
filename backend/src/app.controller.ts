/**
 * 根控制器：健康检查端点
 */
import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('系统')
@Controller()
export class AppController {
  @Get('health')
  @ApiOperation({ summary: '健康检查' })
  check() {
    return {
      status: 'ok',
      service: 'star-reward-backend',
      timestamp: new Date().toISOString(),
    };
  }
}
