<script setup lang="ts">
import { provide } from 'vue';
import { useRoute } from 'vue-router';

import AppFooter from '@/widgets/app-footer/index.vue';
import { useDishes } from '@/features/manage-dishes';

const useDishesData = useDishes();
const route = useRoute();
provide('dishes', useDishesData);
</script>

<template>
  <div class="page">
    <main class="page__main">
      <RouterView />
    </main>
    <AppFooter
      v-if="route.path === '/create'"
      :dish-ids="useDishesData.dishes.value.map((dish) => dish.id)"
    />
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
