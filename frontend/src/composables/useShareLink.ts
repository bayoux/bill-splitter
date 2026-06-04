import { ref } from 'vue';
import { useToast } from 'vue-toastification';

export function useShareLink() {
  const shareLink = ref('');
  const toast = useToast();

  async function copyLink() {
    try {
      const link = `${window.location.origin}/guest`;

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
