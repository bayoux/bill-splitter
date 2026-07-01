import { h, ref, watch } from 'vue';
import { api } from '@/shared/api/instance';
import { useShareLink } from '@/features/share-link';
import { useToast } from 'vue-toastification';
import BaseButton from '@/shared/ui/BaseButton.vue';
import type { Ref } from 'vue';
import type { Dish } from '@/entities/dish';

export function useCreateSession(
  dishes: Ref<Dish[]>,
  clearDishes: (ids: number[]) => Promise<void>,
) {
  const sessionName = ref('');
  const sessionId = ref('');
  const isSessionCreated = ref(false);
  const { copyLink } = useShareLink();
  const toast = useToast();

  async function handleCreate() {
    if (isSessionCreated.value) return;

    try {
      const dishIds = dishes.value.map((dish) => dish.id);
      const { data } = await api.post('/sessions', {
        name: sessionName.value,
        dishIds,
      });

      sessionId.value = data.sessionId;
      isSessionCreated.value = true;
      await clearDishes(dishIds);
      sessionName.value = '';

      toast.success(
        h('div', [
          h('span', 'Сессия создана'),
          h(
            BaseButton,
            {
              onClick: () => copyLink(sessionId.value),
              class: 'footer__button footer__button--copy',
              variant: 'toast',
            },
            'Скопировать ссылку',
          ),
        ]),
        { timeout: false },
      );
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Не удалось создать сессию');
    }
  }

  watch(
    () => dishes.value.length,
    (newValue) => {
      if (newValue > 0) {
        isSessionCreated.value = false;
      }
    },
  );

  return {
    sessionId,
    sessionName,
    isSessionCreated,
    handleCreate,
  };
}
