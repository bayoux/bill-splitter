import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { api } from '@/shared/api/instance';

interface ParticipantSummary {
  participantId: string;
  name: string;
  dishes: string[];
  total: number;
}

interface SessionSummary {
  sessionName: string;
  isExpired: boolean;
  participantCount: number;
  participants: ParticipantSummary[];
  grandTotal: number;
}

export function useSessionSummary(sessionId: string) {
  const summary = ref<SessionSummary | null>(null);
  const loading = ref(false);
  const toast = useToast();

  async function getSummary() {
    loading.value = true;
    try {
      const { data } = await api.get<SessionSummary>(
        `/sessions/${sessionId}/summary`,
      );
      summary.value = data;
    } catch (e) {
      toast.error(
        e instanceof Error ? e.message : 'Не удалось загрузить данные',
      );
    } finally {
      loading.value = false;
    }
  }

  async function finishSession() {
    try {
      await api.patch(`/sessions/${sessionId}/finish`);
      toast.success('Сессия завершена');
      return true;
    } catch (e) {
      toast.error(
        e instanceof Error ? e.message : 'Не удалось завершить сессию',
      );
      return false;
    }
  }

  return {
    summary,
    loading,
    getSummary,
    finishSession,
  };
}
