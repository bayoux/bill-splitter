<script setup lang="ts">
defineOptions({ name: 'AppHeader' });
import { IconMoonFilled, IconSunFilled, IconSparkle } from '@tabler/icons-vue';
import BaseButton from '@/components/BaseButton.vue';
import { useTheme } from '@/composables/useTheme';

const { toggleTheme, isDark } = useTheme();
</script>

<template>
  <header class="header">
    <div class="header__logo">
      <IconSparkle
        class="header__icon"
        stroke="1.8"
      />
      <h1 class="header__title">
        Bill Splitter
      </h1>
    </div>

    <p class="header__tagline">
      Разделите счет честно и без споров
    </p>

    <BaseButton
      variant="icon"
      class="header__theme-toggle"
      @click="toggleTheme()"
    >
      <IconSunFilled v-if="isDark" />
      <IconMoonFilled v-else />
    </BaseButton>
  </header>
</template>

<style lang="scss">
.header {
  position: relative;
  display: flex;
  width: 100%;
  padding: 1rem 1rem 2rem;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  background-color: var(--color-white);
  border-bottom: 0.1rem solid var(--color-light-purple-gray);

  &__logo {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  &__icon {
    color: var(--color-icon);
  }

  &__title {
    font-family: var(--font-heading), serif;
    color: var(--color-primary);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-regular);
    letter-spacing: -0.03rem;
  }

  &__tagline {
    font-size: var(--font-size);
    font-weight: var(--font-weight-regular);
    text-align: center;
    color: var(--color-muted-purple);
  }

  &__theme-toggle {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 2.5rem;
    height: 2.5rem;
    padding: 0.6rem;
    gap: 0.5rem;
    color: var(--color-muted-purple);
    border: 0.1rem solid var(--color-light-purple-gray);
    border-radius: var(--border-radius-lg);
  }
}
</style>
