<script setup lang="ts">
defineOptions({ name: 'StartPage' });
import { IconMoonFilled, IconSparkle, IconSunFilled } from '@tabler/icons-vue';
import { useTheme } from '@/features/toggle-theme';
import BaseButton from '@/shared/ui/BaseButton.vue';
import { useRouter } from 'vue-router';

const { toggleTheme, isDark } = useTheme();
const router = useRouter();
</script>

<template>
  <div class="start-page">
    <BaseButton
      variant="icon"
      class="start-page__theme-toggle"
      @click="toggleTheme()"
    >
      <IconSunFilled v-if="isDark" />
      <IconMoonFilled v-else />
    </BaseButton>

    <div class="start-page__content">
      <div class="start-page__logo">
        <IconSparkle class="start-page__icon" />
        <h1 class="start-page__title">Bill Splitter</h1>
      </div>
      <p class="start-page__tagline">Разделите счет честно и без споров</p>

      <div class="start-page__actions">
        <BaseButton
          variant="primary"
          class="start-page__button"
          @click="router.push('/login')"
        >
          Войти
        </BaseButton>
        <BaseButton
          variant="ghost"
          class="start-page__button"
          @click="router.push('/register')"
        >
          Создать аккаунт
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.start-page {
  position: relative;
  display: flex;
  width: 100%;
  min-height: 100vh;
  padding: 1rem;
  align-items: center;
  justify-content: center;

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

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 28rem;
  }

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
    margin-top: 0.3rem;
    font-size: var(--font-size);
    font-weight: var(--font-weight-regular);
    text-align: center;
    color: var(--color-muted-purple);
  }

  &__actions {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    width: 100%;
    margin-top: 2.3rem;
  }

  &__button {
    width: 100%;
    min-height: 3.5rem;
  }
}
</style>
