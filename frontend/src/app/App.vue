<script setup lang="ts">
import { provide } from 'vue';

import { useDishes } from '@/features/manage-dishes';

const useDishesData = useDishes();
provide('dishes', useDishesData);
</script>

<template>
  <div class="page">
    <main class="page__main">
      <RouterView />
    </main>
  </div>
</template>

<style lang="scss">
.page {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-x: hidden;

  &__main {
    width: 100%;
    flex: 1;
    background: var(--color-light-lavender);
  }
}
</style>
