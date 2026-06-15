import { ref } from 'vue';
import { useToast } from 'vue-toastification';

export function useShareLink() {
  const shareLink = ref('');
  const toast = useToast();

  async function copyLink(sessionId: string) {
    try {
      const link = `${window.location.origin}/sessions/${sessionId}`;

      shareLink.value = link;
      await navigator.clipboard.writeText(link);

      toast.success('Ссылка скопирована!');
    } catch {
      toast.error('Не удалось скопировать ссылку');
    }
  }

  return {
    shareLink,
    copyLink,
  };
}
