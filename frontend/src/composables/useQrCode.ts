import { ref } from 'vue';
import { api } from '@/api/instance';
import { useToast } from 'vue-toastification';

export function useQrCode() {
  const qrSrc = ref('');
  const toast = useToast();
  const fileName = ref('');
  const fileSize = ref('');
  const showQrCode = ref(false);

  async function getQrCode() {
    const { data } = await api.get(`/qr-code`);

    if (data?.qrPath) {
      qrSrc.value = data?.qrPath;
    }
  }

  async function onQrUpload(e: Event) {
    const file = (e.target as HTMLInputElement).files[0];
    fileName.value = file.name;
    fileSize.value = (file.size / 1024 / 1024).toFixed(1) + 'Mb';

    const formData = new FormData();
    formData.append('file', file);

    try {
      const { data } = await api.post(`/qr-code`, formData);
      if (data?.qrPath) qrSrc.value = data.qrPath;
    } catch (e) {
      toast.error(
        e instanceof Error ? e.message : 'не удалось загрузить QR код',
      );
    }
  }

  async function deleteQrCode() {
    await api.delete(`/qr-code`);

    qrSrc.value = '';
  }

  return {
    qrSrc,
    fileName,
    fileSize,
    onQrUpload,
    getQrCode,
    deleteQrCode,
    showQrCode,
  };
}
