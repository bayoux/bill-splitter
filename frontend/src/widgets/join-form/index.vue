<script setup lang="ts">
defineOptions({ name: 'JoinForm' });
import { ref } from 'vue';
import { IconSparkle, IconMoonFilled, IconSunFilled } from '@tabler/icons-vue';
import BaseButton from '@/shared/ui/BaseButton.vue';
import { useTheme } from '@/features/toggle-theme';

const name = ref('');
const emit = defineEmits<{ join: [name: string] }>();
const { toggleTheme, isDark } = useTheme();
</script>

<template>
  <div class="join-page">
    <BaseButton
      variant="icon"
      class="join-page__theme-toggle"
      @click="toggleTheme()"
    >
      <IconSunFilled v-if="isDark" />
      <IconMoonFilled v-else />
    </BaseButton>

    <div class="join-page__logo">
      <IconSparkle class="join-page__icon" />
      <h1 class="join-page__title">Bill Splitter</h1>
    </div>

    <p class="join-page__tagline">Разделите счет честно и без споров</p>

    <div class="join-page__form">
      <input v-model="name" class="join-page__name-input" placeholder="Имя" />

      <BaseButton
        class="join-page__button-join"
        variant="primary"
        :disabled="!name.trim()"
        @click="emit('join', name.trim())"
      >
        Войти
      </BaseButton>
    </div>
  </div>
</template>

<style lang="scss">
.join-page {
  position: relative;
  display: flex;
  width: 100%;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;

  &__theme-toggle {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 2.5rem;
    height: 2.5rem;
    padding: 0.6rem;
    color: var(--color-muted-purple);
    border: 0.1rem solid var(--color-light-purple-gray);
    border-radius: var(--border-radius-md);
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
    padding-bottom: 1.5rem;
    font-size: var(--font-size);
    font-weight: var(--font-weight-regular);
    text-align: center;
    color: var(--color-muted-purple);
  }

  &__form {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  &__name-input {
    max-width: 20rem;
    border-radius: 5rem;
    color: var(--color-muted-dark);

    ::placeholder {
      color: var(--color-muted-purple);
    }
  }

  &__button-join {
    min-height: 3.2rem;
    max-width: 7.3rem;
  }
}
</style>
