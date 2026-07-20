import { h, ref } from 'vue';
import { api } from '@/shared/api/instance';
import { useShareLink } from '@/features/share-link';
import { useToast } from 'vue-toastification';
import BaseButton from '@/shared/ui/BaseButton.vue';

export function useCreateSession(resetDishes: () => void) {
  const sessionName = ref('');
  const sessionId = ref('');
  const isSessionStarted = ref(false);
  const { copyLink } = useShareLink();
  const toast = useToast();

  async function startSession() {
    if (!sessionName.value.trim()) {
      toast.error('Введите название сессии');
      return;
    }

    try {
      const { data } = await api.post('/sessions', {
        name: sessionName.value,
      });

      sessionId.value = data.sessionId;
      isSessionStarted.value = true;
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Не удалось создать сессию');
    }
  }

  function finishSession() {
    const createdSessionId = sessionId.value;

    toast.success(
      h('div', { class: 'toast-content-row' }, [
        h('div', { class: 'toast-content-col' }, [
          h('span', 'Сессия создана'),
          h(
            BaseButton,
            {
              onClick: () => copyLink(createdSessionId),
              variant: 'toast',
            },
            'Скопировать ссылку',
          ),
        ]),
      ]),
      { timeout: false },
    );

    sessionName.value = '';
    sessionId.value = '';
    isSessionStarted.value = false;
    resetDishes();
  }

  return {
    sessionName,
    sessionId,
    isSessionStarted,
    startSession,
    finishSession,
  };
}
