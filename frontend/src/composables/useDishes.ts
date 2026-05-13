import { ref, onMounted } from 'vue';
import axios from 'axios';
import type { Dish } from '@/types/dish';

const API_URL = import.meta.env.VITE_API_URL;

export function useDishes() {
  const dishes = ref<Dish[]>([]);
  const loading = ref(false);
  const error = ref('');

  function validateDish(name: string, price: number) {
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

  async function addDish(name: string, price: number) {
    if (!validateDish(name, price)) return;
    loading.value = true;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', String(price));
    try {
      await axios.post<Dish[]>(`${API_URL}/dishes`, formData);
      await getDishes();
    } catch (e) {
      error.value =
        e instanceof Error ? e.message : 'не удалось добавить блюдо';
    } finally {
      loading.value = false;
    }
  }

  async function deleteDish(id: number) {
    loading.value = true;
    try {
      await axios.delete(`${API_URL}/dishes/${id}`);
      await getDishes();
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'не удалось удалить';
    } finally {
      loading.value = false;
    }
  }

  async function editDish({ id, name, price }: Dish) {
    loading.value = true;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', String(price));
    try {
      await axios.patch(`${API_URL}/dishes/${id}`, formData);
      await getDishes();
    } catch (e) {
      error.value =
        e instanceof Error ? e.message : 'не удалось обновить блюдо';
    } finally {
      loading.value = false;
    }
  }

  return {
    dishes,
    loading,
    error,
    getDishes,
    addDish,
    deleteDish,
    editDish,
  };
}
