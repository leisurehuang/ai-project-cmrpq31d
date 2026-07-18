/**
 * 创建任务 DTO
 * 字段严格对应方案 dataModel.Task 的可写部分
 */
import { IsString, IsInt, Min, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ description: '任务名称', example: '按时起床', maxLength: 100 })
  @IsString()
  @MaxLength(100)
  title: string;

  @ApiProperty({ description: '完成奖励的星星数', example: 5, minimum: 1 })
  @IsInt()
  @Min(1)
  starValue: number;
}
