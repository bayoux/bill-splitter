<script setup lang="ts"></script>
<template>
  <nav class="navigation">
    <RouterLink to="/create" class="navigation__link">
      <span class="navigation__icon"><i class="ti ti-plus"></i></span>
      Добавить блюдо
    </RouterLink>
    <RouterLink to="/guest" class="navigation__link">
      <span class="navigation__icon">◉</span>
      Что я ел
    </RouterLink>
  </nav>
</template>

<style lang="scss">
.navigation {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;

  &__link {
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

  &__link:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
    background: var(--color-primary-light);
  }

  &__link.router-link-active {
    background: var(--color-primary);
    border-color: var(--color-primary);
    color: var(--color-white);
  }

  &__icon {
    font-size: 1rem;
  }
}
</style>
