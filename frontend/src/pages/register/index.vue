<script setup lang="ts">
import BaseButton from '@/shared/ui/BaseButton.vue';

defineOptions({ name: 'RegisterPage' });

import {
  IconEye,
  IconEyeOff,
  IconMoonFilled,
  IconSparkle,
  IconSunFilled,
} from '@tabler/icons-vue';
import { useTheme } from '@/features/toggle-theme';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/entities/user';

const { toggleTheme, isDark } = useTheme();
const router = useRouter();
const { register, loading } = useAuth();
const email = ref('');
const name = ref('');
const password = ref('');
const showPassword = ref(false);

async function handleSubmit() {
  const ok = await register(email.value, name.value, password.value);
  if (ok) {
    router.push('/dashboard');
  }
}
</script>

<template>
  <div class="register-page">
    <div class="register-page__logo">
      <IconSparkle class="register-page__icon" />
      <h1 class="register-page__title">Bill Splitter</h1>
    </div>

    <BaseButton
      variant="icon"
      class="header__theme-toggle"
      @click="toggleTheme()"
    >
      <IconSunFilled v-if="isDark" />
      <IconMoonFilled v-else />
    </BaseButton>

    <div class="register-page__heading">
      <h2 class="register-page__headline">Регистрация</h2>
      <p class="register-page__text">Создайте аккаунт за минуту</p>
    </div>

    <form class="register-page__form" @submit.prevent="handleSubmit">
      <input
        v-model="name"
        class="register-page__input"
        type="text"
        placeholder="Ваше имя"
        required
      />
      <input
        v-model="email"
        class="register-page__input"
        type="email"
        placeholder="Email"
        required
      />

      <div class="login-page__input login-page__password-field">
        <input
          v-model="password"
          class="register-page__input"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Пароль"
        />
        <button type="button" @click="showPassword = !showPassword">
          <IconEye v-if="showPassword" />
          <IconEyeOff v-else />
        </button>
      </div>

      <BaseButton
        variant="primary"
        class="register-page__button"
        :disabled="loading"
      >
        {{ loading ? 'Загрузка...' : 'Зарегистрироваться' }}
      </BaseButton>
    </form>

    <RouterLink to="/login" class="register-page__link">
      Уже есть аккаунт? Войти
    </RouterLink>
  </div>
</template>

<style lang="scss">
.register-page {
  position: relative;
  display: flex;
  width: 100%;
  min-height: 100vh;
  padding: 1rem 1rem 2rem;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;

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

  &__tagline,
  &__text {
    font-size: var(--font-size);
    font-weight: var(--font-weight-regular);
    text-align: center;
    color: var(--color-muted-purple);
  }

  &__headline {
    font-family: var(--font-heading), serif;
    color: var(--color-primary);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    letter-spacing: -0.03rem;
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
    border-radius: var(--border-radius-md);
  }

  &__heading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 2.3rem 0 1rem;
    gap: 0.4rem;
  }

  &__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.7rem;
    width: 100%;
  }

  &__input {
    min-height: 3.5rem;
    width: 100%;
    max-width: 28rem;
    border-radius: var(--border-radius-md);
    border: 0.1rem solid var(--color-secondary);
    padding: 0 1rem;
    color: var(--color-dark);

    &:hover,
    &:focus {
      border-color: var(--color-primary);
    }
  }

  &__button {
    width: 100%;
    max-width: 28rem;
    min-height: 3.5rem;
    margin-top: 0.5rem;
  }

  &__link {
    margin-top: 1rem;
    color: var(--color-primary);
    font-size: var(--font-size-sm);
  }
}
</style>
