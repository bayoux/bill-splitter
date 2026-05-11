import { ref, onMounted } from 'vue';
import axios from 'axios';
import type { Dish } from '@/types/dish';

const API_URL = import.meta.env.VITE_API_URL;

export function useDishes() {
  const dishes = ref<Dish[]>([]);
  const loading = ref(false);
  const error = ref('');

  function handleError(name: string, price: number) {
    if (!name.trim()) {
      error.value = 'Название не должно быть пустым';
      return false;
    }
    if (price <= 0) {
      error.value = 'Цена должна быть больше нуля';
      return false;
    }
    error.value = '';
    return true;
  }

  async function getDishes() {
    const { data } = await axios.get<Dish[]>(`${API_URL}/dishes`);
    dishes.value = data;
  }

  onMounted(async () => {
    loading.value = true;
    try {
      await getDishes();
    } catch (e) {
      error.value =
        e instanceof Error ? e.message : 'не удалось загрузить данные';
    } finally {
      loading.value = false;
    }
  });

  async function addDish(name: string, price: number) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', String(price));
    try {
      await axios.post<Dish[]>(`${API_URL}/dishes`, formData);
      await getDishes();
    } catch (e) {
      error.value =
        e instanceof Error ? e.message : 'не удалось добавить блюдо';
    }
  }

  async function deleteDish(id: number) {
    try {
      await axios.delete(`${API_URL}/dishes/${id}`);
      await getDishes();
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'не удалось удалить';
    }
  }

  async function editDish({ id, name, price }: Dish) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', String(price));
    try {
      await axios.patch(`${API_URL}/dishes/${id}`, formData);
      await getDishes();
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
    handleError,
  };
}
