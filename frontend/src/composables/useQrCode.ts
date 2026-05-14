import { ref } from 'vue';
import { api } from '@/api/instance';

export function useQrCode() {
  const qrSrc = ref('');
  const error = ref('');

  async function getQrCode() {
    const { data } = await api.get(`/qr-code`);

    if (data?.qrPath) {
      const normalizedPath = data.qrPath.replace(/\\/g, '/');
      qrSrc.value = `${api.defaults.baseURL}/${normalizedPath}`;
      console.log(qrSrc.value);
    }
  }

  async function onQrUpload(e: Event) {
    const file = (e.target as HTMLInputElement).files[0];

    const formData = new FormData();
    formData.append('file', file);

    try {
      const { data } = await api.post(`/qr-code`, formData);
      if (data?.qrPath) qrSrc.value = `${api.defaults.baseURL}/${data.qrPath}`;
    } catch (e) {
      error.value =
        e instanceof Error ? e.message : 'не удалось загрузить QR код';
    }
  }

  async function deleteQrCode() {
    await api.delete(`/qr-code`);

    qrSrc.value = '';
  }

  return { qrSrc, onQrUpload, getQrCode, deleteQrCode };
}
