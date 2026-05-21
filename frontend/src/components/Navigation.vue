<script setup lang="ts"></script>
<template>
  <nav class="page__nav">
    <RouterLink to="/create" class="page__nav-link">
      <span class="page__nav-icon"><i class="ti ti-plus"></i></span>
      Добавить блюдо
    </RouterLink>
    <RouterLink to="/guest" class="page__nav-link">
      <span class="page__nav-icon">◉</span>
      Что я ел
    </RouterLink>
  </nav>
</template>

<style lang="scss">
.page {
  &__nav {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
  }

  &__nav-link {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.5rem 3rem;
    border-radius: 1rem;
    background: var(--color-white);
    border: 1.5px solid var(--color-border);
    color: var(--color-charcoal);
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.2s ease;
  }

  &__nav-link:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
    background: var(--color-primary-light);
  }

  &__nav-link.router-link-active {
    background: var(--color-primary);
    border-color: var(--color-primary);
    color: var(--color-white);
  }

  &__nav-icon {
    font-size: 1rem;
  }
}
</style>
