import { ref, onMounted } from 'vue';
import axios from 'axios';
import type { Dish } from '@/types/dish';

export function useDishes() {
  const dishes = ref<Dish[]>([]);
  const loading = ref(false);
  const error = ref('');

  onMounted(async () => {
    loading.value = true;

    try {
      const { data } = await axios.get<Dish[]>(
        `${import.meta.env.VITE_API_URL}/dishes`,
      );
      dishes.value = data.reverse();
    } catch (e) {
      error.value =
        e instanceof Error ? e.message : 'не удалось загрузить данные';
    } finally {
      loading.value = false;
    }
  });

  async function addDish(name: string, price: number) {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', String(price));

      await axios.post<Dish[]>(
        `${import.meta.env.VITE_API_URL}/dishes`,
        formData,
      );
      const { data } = await axios.get<Dish[]>(
        `${import.meta.env.VITE_API_URL}/dishes`,
      );
      dishes.value = data.reverse();
    } catch (e) {
      error.value =
        e instanceof Error ? e.message : 'не удалось добавить блюдо';
    }
  }

  async function deleteDish(id: number) {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/dishes/${id}`);
      const { data } = await axios.get<Dish[]>(
        `${import.meta.env.VITE_API_URL}/dishes`,
      );
      dishes.value = data;
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'не удалось удалить';
    }
  }

  async function editDish(id: number, name: string, price: number) {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', String(price));

      await axios.patch(
        `${import.meta.env.VITE_API_URL}/dishes/${id}`,
        formData,
      );
      const { data } = await axios.get<Dish[]>(
        `${import.meta.env.VITE_API_URL}/dishes`,
      );
      dishes.value = data;
    } catch (e) {
      error.value =
        e instanceof Error ? e.message : 'не удалось обновить блюдо';
    }
  }

  return {
    dishes,
    loading,
    error,
    addDish,
    deleteDish,
    editDish,
  };
}
