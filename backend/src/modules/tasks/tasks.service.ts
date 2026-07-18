/**
 * 任务服务（示例）
 *
 * ⚠ 骨架实现要点：
 *   1. create/findAll/findOne/update/remove 为标准 CRUD，可立即跑通
 *   2. complete() 仅返回 TODO 提示，真实事务逻辑由 IDE 接管实现：
 *      - 校验任务状态（PENDING -> DONE）
 *      - 在 Prisma 事务中：更新任务状态 + 写入 StarLog + 累加 Child.totalStars
 *   3. childId 当前为 mock 占位，IDE 接入 JWT 后从 token 提取
 */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 创建任务
   * TODO: childId 改为从 JWT Token 获取
   */
  async create(createTaskDto: CreateTaskDto) {
    const mockChildId = '00000000-0000-0000-0000-000000000000';
    return this.prisma.task.create({
      data: { ...createTaskDto, childId: mockChildId },
    });
  }

  /** 分页查询任务列表 */
  async findAll(paginationDto: PaginationDto) {
    const { page, pageSize } = paginationDto;
    const [items, total] = await Promise.all([
      this.prisma.task.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.task.count(),
    ]);
    return { items, total, page, pageSize };
  }

  /** 查询单个任务 */
  async findOne(id: string) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) throw new NotFoundException(`任务 ${id} 不存在`);
    return task;
  }

  /** 更新任务 */
  async update(id: string, updateTaskDto: UpdateTaskDto) {
    await this.findOne(id); // 不存在则抛 404
    return this.prisma.task.update({ where: { id }, data: updateTaskDto });
  }

  /**
   * 完成任务（骨架）
   * TODO IDE 接管：用 Prisma $transaction 实现
   *   1. 校验 task.status === PENDING
   *   2. task.update status -> DONE
   *   3. starLog.create { type: TASK, amount: task.starValue, reason: task.title }
   *   4. child.update totalStars += task.starValue
   */
  async complete(id: string) {
    const task = await this.findOne(id);
    if (task.status === 'DONE') {
      return { task, message: '任务已完成，无需重复操作' };
    }
    return {
      task,
      message: 'TODO: 待 IDE 实现事务化完成逻辑（状态流转 + 星星发放）',
    };
  }

  /** 删除任务 */
  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.task.delete({ where: { id } });
  }
}
