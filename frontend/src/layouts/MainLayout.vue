<template>
  <div class="min-h-screen flex flex-col">
    <!-- 顶部导航栏 -->
    <header class="bg-secondary text-white shadow-md">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold flex items-center gap-2">
          <span>⭐</span> 星星乐园
        </h1>
        <nav class="flex gap-4">
          <!-- 导航占位 -->
          <span class="text-sm opacity-75 bg-secondary-dark px-3 py-1 rounded-full">家长入口</span>
        </nav>
      </div>
    </header>

    <!-- 主内容区 -->
    <main class="flex-1 container mx-auto p-4">
      <slot />
    </main>

    <!-- 底部栏 -->
    <footer class="bg-gray-800 text-white text-center p-4 text-xs">
      © 2024 星星乐园 - 让进步变得快乐
    </footer>
  </div>
</template>

<script setup lang="ts">
// 全局布局组件，负责包裹所有业务页面
</script>
