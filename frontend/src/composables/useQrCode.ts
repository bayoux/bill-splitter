import { onMounted, ref } from 'vue';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export function useQrCode() {
  const qrSrc = ref('');
  const error = ref('');

  async function getQrCode() {
    const { data } = await axios.get(`${API_URL}/qr-code`);
    if (data?.qrPath) qrSrc.value = `${API_URL}/${data.qrPath}`;
  }

  async function onQrUpload(e: Event) {
    const file = (e.target as HTMLInputElement).files[0];
    const formData = new FormData();
    formData.append('file', file);
    try {
      const { data } = await axios.post(`${API_URL}/qr-code`, formData);
      if (data?.qrPath) qrSrc.value = `${API_URL}/${data.qrPath}`;
    } catch (e) {
      error.value =
        e instanceof Error ? e.message : 'не удалось загрузить QR код';
    }
  }

  async function deleteQrCode() {
    await axios.delete(`${API_URL}/qr-code`);
    qrSrc.value = '';
  }

  return { qrSrc, onQrUpload, getQrCode, deleteQrCode };
}
