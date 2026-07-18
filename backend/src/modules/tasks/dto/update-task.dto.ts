/**
 * 更新任务 DTO
 * 所有字段可选
 */
import { PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
