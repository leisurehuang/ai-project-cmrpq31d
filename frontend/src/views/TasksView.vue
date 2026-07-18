<template>
  <div class="space-y-4">
    <div class="bg-white rounded-2xl shadow-sm p-6">
      <h2 class="text-xl font-bold text-gray-800 mb-4">📋 今日任务（前后端联通示例）</h2>
      
      <!-- 加载状态 -->
      <div v-if="loading" class="text-gray-500 text-center py-8 animate-pulse">
        正在努力加载星星任务...
      </div>
      
      <!-- 空状态 -->
      <div v-else-if="tasks.length === 0" class="text-gray-400 text-center py-8">
        还没有任务哦~
      </div>

      <!-- 任务列表 -->
      <ul v-else class="space-y-3">
        <li 
          v-for="task in tasks" 
          :key="task.id"
          class="flex items-center justify-between p-4 bg-gray-50 rounded-xl transition-all hover:bg-gray-100"
        >
          <div>
            <h3 class="font-semibold text-gray-800">{{ task.title }}</h3>
            <p class="text-xs text-gray-400 mt-1">创建于 {{ new Date(task.createdAt).toLocaleDateString() }}</p>
          </div>
          <div class="flex items-center gap-3">
            <span class="flex items-center gap-1 text-primary-dark font-bold">
              +{{ task.starValue }} <span>⭐</span>
            </span>
            <span 
              class="text-xs px-2 py-1 rounded-full"
              :class="task.status === 'DONE' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'"
            >
              {{ task.status === 'DONE' ? '已完成' : '待完成' }}
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getTasks, type Task } from '@/api/tasks';

const tasks = ref<Task[]>([]);
const loading = ref(true);

// 获取任务列表
const fetchTasks = async () => {
  try {
    loading.value = true;
    const res = await getTasks({ page: 1, pageSize: 10 });
    tasks.value = res.items;
  } catch (error) {
    console.error('获取任务失败:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchTasks();
});
</script>
