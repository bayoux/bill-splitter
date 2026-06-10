import { ref } from 'vue';
import { api } from '@/api/instance';
import { useToast } from 'vue-toastification';
import type { Dish } from '@/types/dish';
import type { Participant } from '@/types/participant';

export function useSession(sessionId: string) {
  const dishes = ref<Dish[]>([]);
  const participants = ref<Participant[]>([]);
  const loading = ref(false);
  const toast = useToast();

  async function getSession() {
    loading.value = true;

    try {
      const { data } = await api.get(`/sessions/${sessionId}`);

      dishes.value = data.dishes;
      participants.value = data.participants;
    } catch (e) {
      toast.error(
        e instanceof Error ? e.message : 'Не удалось загрузить данные',
      );
    } finally {
      loading.value = false;
    }
  }

  return {
    dishes,
    participants,
    loading,
    getSession,
  };
}
