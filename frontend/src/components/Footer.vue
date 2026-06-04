<script setup lang="ts">
defineOptions({ name: 'AppFooter' });
import BaseButton from '@/components/BaseButton.vue';
import { IconClipboardFilled } from '@tabler/icons-vue';
import { useShareLink } from '@/composables/useShareLink';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const { copyLink } = useShareLink();
const toast = useToast();
const router = useRouter();
</script>

<template>
  <footer class="footer">
    <BaseButton
      variant="secondary"
      @click="copyLink"
      class="footer__button footer__button--copy"
    >
      <IconClipboardFilled />
      Скопировать ссылку
    </BaseButton>

    <BaseButton
      variant="primary"
      @click="
        router.push('/guest');
        toast.success('Сохранено');
      "
      class="footer__button footer__button--save"
    >
      Сохранить
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
  }

  @media (max-width: 480px) {
    padding: 1rem 0.5rem 2rem;
  }
}
</style>
