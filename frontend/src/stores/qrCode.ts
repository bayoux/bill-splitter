import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useToast } from 'vue-toastification';
import { api } from '@/api/instance';
import { formatSize } from '@/utils/formatSize';

export const useQrCodeStore = defineStore('qrCode', () => {
  const qrSrc = ref('');
  const toast = useToast();
  const fileName = ref('');
  const fileSize = ref('');
  const showQrCode = ref(false);

  async function getQrCode() {
    try {
      const { data } = await api.get(`/qr-code`);
      if (data?.qrPath) {
        qrSrc.value = data.qrPath;
        fileName.value = data.qrPath.split('/').pop();
        fileSize.value = formatSize(data.fileSize);
      }
    } catch {
      toast.error('Не удалось загрузить QR код');
    }
  }

  async function onQrUpload(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    fileName.value = file.name;
    fileSize.value = formatSize(file.size);

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
    try {
      await api.delete(`/qr-code`);
      qrSrc.value = '';
      fileName.value = '';
      fileSize.value = '';
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Не удалось удалить QR');
    }
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
});
