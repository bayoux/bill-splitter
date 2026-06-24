<script setup lang="ts">
import { DishesContext } from '@/features/manage-dishes';

defineOptions({ name: 'AppFooter' });
import { inject, ref, watch } from 'vue';
import { useToast } from 'vue-toastification';
import { IconClipboardFilled, IconSquareRoundedCheck } from '@tabler/icons-vue';

import { useShareLink } from '@/features/share-link';
import { api } from '@/shared/api/instance';
import BaseButton from '@/shared/ui/BaseButton.vue';
import { useRouter } from 'vue-router';

const sessionId = ref('');
const { copyLink } = useShareLink();
const toast = useToast();
const props = defineProps<{ dishIds: number[] }>();
const router = useRouter();
const dishesData = inject<DishesContext>('dishes');
const isSessionCreated = ref(false);

async function handleSave() {
  if (isSessionCreated.value) return;

  try {
    const { data } = await api.post('/sessions', { dishIds: props.dishIds });
    sessionId.value = data.sessionId;
    isSessionCreated.value = true;

    await dishesData?.clearDishes(props.dishIds);

    toast.success('Сессия создана');
  } catch (e) {
    toast.error(e instanceof Error ? e.message : 'Не удалось создать сессию');
  }
}

watch(
  () => props.dishIds.length,
  (newValue) => {
    if (newValue > 0) isSessionCreated.value = false;
  },
);

function showAllSessions() {
  router.push('/all-sessions');
}
</script>

<template>
  <footer class="footer">
    <BaseButton
      variant="primary"
      :disabled="!props.dishIds.length || isSessionCreated"
      class="footer__button footer__button--save"
      @click="handleSave"
    >
      Сохранить
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
    <BaseButton
      variant="secondary"
      class="footer__button footer__button--created"
      @click="showAllSessions()"
    >
      <IconSquareRoundedCheck />
      Созданные
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
