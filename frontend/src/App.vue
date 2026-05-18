<script setup>
import AddDishHeader from '@/components/dishes/AddDishHeader.vue';
import AddDishNav from '@/components/dishes/AddDishNav.vue';
</script>

<template>
  <div class="page">
    <AddDishHeader />
    <AddDishNav />
    <main class="page__main">
      <RouterView />
    </main>
  </div>
</template>

<style lang="scss">
.page {
  &__header {
    padding: 1.25rem 0;
    position: sticky;

    &-inner {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.625rem;
    }

    &-logo {
      display: flex;
      align-items: center;
      gap: 0.625rem;

      &-icon {
        font-size: 1.25rem;
        color: var(--color-primary);
      }

      &-title {
        font-family: 'DM Serif Display', serif;
        font-size: 2rem;
        font-weight: 400;
        letter-spacing: -0.03125rem;
      }
    }

    &-tagline {
      font-size: 0.875rem;
      color: var(--color-gray);
      font-weight: 300;
      padding-left: 1.5625rem;
    }
  }

  &__nav {
    display: flex;
    gap: 0.625rem;
    margin-bottom: 1.5625rem;
    flex-wrap: wrap;
  }

  &__nav-link {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.5rem 3.125rem;
    border-radius: 1rem;
    background: var(--color-white);
    border: 1.5px solid var(--color-border);
    color: var(--color-charcoal);
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.2s ease;

    &:hover {
      border-color: var(--color-primary);
      color: var(--color-primary);
      background: var(--color-primary-light);
    }

    &.router-link-active {
      background: var(--color-primary);
      border-color: var(--color-primary);
      color: var(--color-white);
    }
  }

  &__nav-icon {
    font-size: 1rem;
  }

  &__main {
    flex: 1;
    width: 100%;
    background: var(--color-white);
    border-radius: 1rem;
    border: 1px solid var(--color-border);
    padding: 1.25rem 1.5625rem;
  }
}
</style>
