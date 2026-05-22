<script setup lang="ts"></script>
<template>
  <header class="header">
    <div class="header__logo">
      <span class="header__icon">✦</span>
      <h1 class="header__title">Bill Splitter</h1>
    </div>
    <p class="header__tagline">Разделите счет честно и без споров</p>
  </header>
</template>

<style lang="scss">
.header {
  padding: 1.5rem 0;
  position: sticky;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.6rem;

  &__logo {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  &__icon {
    font-size: 1.5rem;
    color: var(--color-primary);
  }

  &__title {
    font-family: var(--font-heading), serif;
    font-size: 2rem;
    font-weight: 400;
    letter-spacing: -0.03rem;
  }

  &__tagline {
    font-size: 0.9rem;
    color: var(--color-gray);
    font-weight: 300;
    padding-left: 1.5rem;
  }
}
</style>
