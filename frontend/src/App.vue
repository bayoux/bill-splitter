<script setup lang="ts">
import AddHeader from '@/components/AddHeader.vue';
import AddNav from '@/components/AddNav.vue';
import { useDishes } from '@/composables/useDishes';
import { onMounted, provide } from 'vue';

const useDishesData = useDishes();
provide('dishes', useDishesData);

onMounted(async () => {
  await useDishesData.getDishes();
});
</script>

<template>
  <div class="page">
    <AddHeader />
    <AddNav />
    <main class="page__main">
      <RouterView />
    </main>
  </div>
</template>

<style lang="scss">
.page {
  &__main {
    flex: 1;
    width: 100%;
    background: var(--color-white);
    border-radius: 1rem;
    border: 1px solid var(--color-border);
    padding: 1.5rem 1.5rem;
  }
}
</style>
