<script setup lang="ts"></script>
<template>
  <header class="page__header">
    <div class="page__header-inner">
      <div class="page__header-logo">
        <span class="page__header-logo-icon">✦</span>
        <h1 class="page__header-logo-title">Bill Splitter</h1>
      </div>
      <p class="page__header-tagline">Разделите счет честно и без споров</p>
    </div>
  </header>
</template>

<style scoped lang="scss">
.page {
  &__header {
    padding: 1.5rem 0;
    position: sticky;
  }

  &__header-inner {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.6rem;
  }

  &__header-logo {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  &__header-logo-icon {
    font-size: 1.5rem;
    color: var(--color-primary);
  }

  &__header-logo-title {
    font-family: 'DM Serif Display', serif;
    font-size: 2rem;
    font-weight: 400;
    letter-spacing: -0.03rem;
  }

  &__header-tagline {
    font-size: 0.9rem;
    color: var(--color-gray);
    font-weight: 300;
    padding-left: 1.5rem;
  }
}
</style>
