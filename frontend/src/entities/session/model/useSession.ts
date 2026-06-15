import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import axios from 'axios';

import type { Dish } from '@/entities/dish';
import type { Participant } from '@/entities/participant';
import { api } from '@/shared/api/instance';

export function useSession(sessionId: string) {
  const dishes = ref<Dish[]>([]);
  const participants = ref<Participant[]>([]);
  const loading = ref(false);
  const toast = useToast();

  async function getSession(showLoading = true) {
    if (showLoading) loading.value = true;

    try {
      const { data } = await api.get(`/sessions/${sessionId}`);

      dishes.value = data.dishes;
      participants.value = data.participants;
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 404) {
        toast.error('Сессия не найдена');
      } else {
        toast.error('Не удалось загрузить данные');
      }
    } finally {
      if (showLoading) loading.value = false;
    }
  }

  return {
    dishes,
    participants,
    loading,
    getSession,
  };
}
