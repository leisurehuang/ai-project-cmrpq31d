/**
 * 任务控制器（示例 CRUD）
 * 路径前缀 /api/v1 由 main.ts 统一设置
 *
 * ⚠ 注意：以下接口仅作为前后端联通验证骨架
 *    后续 IDE 接管时需补充：
 *    - JWT 装饰器（@UseGuards）
 *    - PIN-Token 校验装饰器（敏感操作）
 *    - 从 token 提取 childId 替换 mock
 */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('任务管理')
@ApiBearerAuth()
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: '创建固定任务（家长 PIN 校验）' })
  create(@Body() createTaskDto: CreateTaskDto) {
    // TODO: 接入 PIN-Token 装饰器校验
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: '查询任务列表（分页）' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.tasksService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: '查询单个任务详情' })
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新任务信息' })
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Put(':id/complete')
  @ApiOperation({ summary: '勾选完成任务并发放星星（家长 PIN 校验）' })
  complete(@Param('id') id: string) {
    // TODO: 接入事务化完成逻辑（任务状态 + 星星流水 + 余额更新原子完成）
    return this.tasksService.complete(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除任务' })
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
