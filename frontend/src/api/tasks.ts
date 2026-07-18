/**
 * 任务模块 API 接口封装
 */
import request from './request';

/** 任务状态枚举 */
export enum TaskStatus {
  PENDING = 'PENDING',
  DONE = 'DONE',
}

/** 任务数据结构 */
export interface Task {
  id: string;
  childId: string;
  title: string;
  starValue: number;
  status: TaskStatus;
  createdAt: string;
}

/** 列表查询结果 */
export interface TaskListResult {
  items: Task[];
  total: number;
  page: number;
  pageSize: number;
}

/**
 * 获取任务列表
 */
export const getTasks = (params?: { page?: number; pageSize?: number }) => {
  return request.get<any, TaskListResult>('/api/v1/tasks', { params });
};
