<script setup lang="ts">
import router from '@/app/router';

defineOptions({ name: 'AppFooter' });
import { IconList } from '@tabler/icons-vue';
import BaseButton from '@/shared/ui/BaseButton.vue';

function showAllSessions() {
  router.push('/all-sessions');
}
</script>

<template>
  <footer class="footer">
    <BaseButton variant="primary" class="footer__button footer__button--save">
      Создать сессию
    </BaseButton>
    <BaseButton
      variant="secondary"
      class="footer__button footer__button--created"
      @click="showAllSessions()"
    >
      <IconList />
      Список сессий
    </BaseButton>
  </footer>
</template>

<style lang="scss">
.footer {
  display: flex;
  width: 100%;
  padding: 1rem 1rem 2rem;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  gap: 1rem;
  background-color: var(--color-white);

  &__button {
    flex: 1;
    padding: 1rem;
    border-radius: var(--border-radius-lg);
    height: 3.5rem;

    &--copy {
      margin-left: 1rem;
    }
  }

  @media (max-width: 480px) {
    padding: 1rem 0.5rem 2rem;
  }
}
</style>
