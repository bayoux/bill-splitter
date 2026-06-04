<script setup lang="ts">
import { onMounted, provide } from 'vue';
import { useRoute } from 'vue-router';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { useDishes } from '@/composables/useDishes';

const useDishesData = useDishes();
const route = useRoute();
provide('dishes', useDishesData);

onMounted(async () => {
  await useDishesData.getDishes();
});
</script>

<template>
  <div class="page">
    <Header />
    <main class="page__main">
      <RouterView />
    </main>
    <Footer v-if="route.path === '/create'" />
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
