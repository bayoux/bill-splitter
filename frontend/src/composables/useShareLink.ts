import { useToast } from 'vue-toastification';
import { ref } from 'vue';

export function useShareLink() {
  const shareLink = ref('');
  const toast = useToast();

  async function copyLink() {
    try {
      const link = `${window.location.origin}/guest`;

      shareLink.value = link;
      await navigator.clipboard.writeText(link);

      toast.success('Ссылка скопирована!');
    } catch (e) {
      toast.error('Не удалось скопировать ссылку');
    }
  }

  return {
    shareLink,
    copyLink,
  };
}
