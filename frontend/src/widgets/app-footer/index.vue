<script setup lang="ts">
defineOptions({ name: 'AppFooter' });
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { IconClipboardFilled } from '@tabler/icons-vue';

import { useShareLink } from '@/features/share-link';
import { api } from '@/shared/api/instance';
import BaseButton from '@/shared/ui/BaseButton.vue';

const sessionId = ref('');
const { copyLink } = useShareLink();
const toast = useToast();
const props = defineProps<{ dishIds: number[] }>();

async function handleSave() {
  try {
    const { data } = await api.post('/sessions', { dishIds: props.dishIds });
    sessionId.value = data.sessionId;
    toast.success('Сессия создана');
  } catch (e) {
    toast.error(e instanceof Error ? e.message : 'Не удалось создать сессию');
  }
}
</script>

<template>
  <footer class="footer">
    <BaseButton
      variant="primary"
      :disabled="!props.dishIds.length"
      class="footer__button footer__button--save"
      @click="handleSave"
    >
      Создать
    </BaseButton>
    <BaseButton
      variant="secondary"
      :disabled="!sessionId"
      class="footer__button footer__button--copy"
      @click="copyLink(sessionId)"
    >
      <IconClipboardFilled />
      Скопировать ссылку
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
