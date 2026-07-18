/**
 * 许愿池与兑换模块（占位）
 *
 * 待 IDE 实现：
 *   - POST   /api/v1/toys              添加玩具目标（家长 PIN 校验）
 *   - POST   /api/v1/redeems           儿童发起兑换（扣星 + 生成订单，事务）
 *   - PUT    /api/v1/redeems/:id/deliver 家长确认线下交付（PIN 校验）
 *
 * ⚠ 兑换接口必须用事务 + 条件扣减（WHERE total_stars >= cost）防超扣
 */
import { Module } from '@nestjs/common';

@Module({})
export class ToysModule {}
