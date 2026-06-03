import { defineStore } from 'pinia';
import { ref } from 'vue';
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
    const { data } = await api.get(`/qr-code`);

    if (data?.qrPath) {
      qrSrc.value = data?.qrPath;
      fileName.value = data.qrPath.split('/').pop();
      fileSize.value = formatSize(data.fileSize);
    }
  }

  async function onQrUpload(e: Event) {
    const file = (e.target as HTMLInputElement).files[0];
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
});
