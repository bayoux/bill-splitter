<script setup lang="ts">
defineOptions({
  name: 'NotFoundPage',
});
import { IconMoodPuzzled } from '@tabler/icons-vue';
</script>

<template>
  <div class="not-found-page">
    <IconMoodPuzzled class="not-found-page__icon" />
    <h1 class="not-found-page__code">404</h1>
    <h2 class="not-found-page__title">Страница не найдена</h2>
    <router-link to="/" class="not-found-page__button">
      На главную
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.not-found-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100dvh;
  text-align: center;
  padding: 2rem;
  gap: 0.5rem;

  &__icon {
    width: 5rem;
    height: 5rem;
    margin-bottom: 1rem;
    color: var(--color-muted-purple);
    animation: float 3s ease-in-out infinite;
  }

  &__code {
    font-size: var(--font-size-xxl);
    font-weight: var(--font-weight-extrabold);
    color: var(--color-primary);
    margin: 0;
    line-height: 1;
  }

  &__title {
    color: var(--color-muted-purple);
    margin-bottom: 1rem;
  }

  &__button {
    padding: 1.5rem;
    border-radius: var(--border-radius-md);
    background: var(--color-primary);
    color: var(--color-white);
    text-decoration: none;
    box-shadow: 0 4px 14px rgba(124, 111, 216, 0.35);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}
</style>
