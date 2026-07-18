/**
 * 路由配置骨架
 */
import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'home',
          // 示例页面：任务列表（验证前后端联通）
          component: () => import('@/views/TasksView.vue'),
        },
        // TODO: 后续添加路由
        // { path: '/dashboard', name: 'dashboard', component: () => import('@/views/DashboardView.vue') },
        // { path: '/toys', name: 'toys', component: () => import('@/views/ToysView.vue') },
      ],
    },
  ],
});

export default router;
