import { api } from '@/api/instance';
import { computed, ref } from 'vue';
import { useToast } from 'vue-toastification';

export function useParticipant(sessionId: string) {
  const participantTokenKey = `bill_splitter_participantToken_${sessionId}`;
  const participantIdKey = `bill_splitter_participantId_${sessionId}`;
  const participantNameKey = `bill_splitter_participantName_${sessionId}`;
  const token = ref(localStorage.getItem(participantTokenKey));
  const isJoined = computed(() => token.value !== null);
  const toast = useToast();

  async function join(name: string) {
    try {
      const { data } = await api.post(`/sessions/${sessionId}/join`, { name });
      localStorage.setItem(participantTokenKey, data.participantToken);
      localStorage.setItem(participantIdKey, `${data.participantId}`);
      localStorage.setItem(participantNameKey, `${data.participantName}`);
      token.value = data.participantToken;
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Не удалось присоединиться');
    }
  }

  async function selectDish(dishId: number, selected: boolean) {
    try {
      await api.post(
        `/sessions/${sessionId}/select`,
        {
          dishId,
          selected,
        },
        { headers: { Authorization: `Bearer ${token.value}` } },
      );
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Не удалось выбрать блюдо');
    }
  }

  return {
    isJoined,
    join,
    selectDish,
  };
}
