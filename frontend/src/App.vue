<script setup lang="ts">
import Header from '@/components/Header.vue';
import Navigation from '@/components/Navigation.vue';
import { useDishes } from '@/composables/useDishes';
import { onMounted, provide } from 'vue';
import Footer from '@/components/Footer.vue';

const useDishesData = useDishes();
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
    <Footer />
  </div>
</template>

<style lang="scss">
.page {
  display: flex;
  flex-direction: column;
  flex: 1;

  &__main {
    width: 100%;
    flex: 1;
    background: var(--color-light-lavender);
  }
}
</style>
