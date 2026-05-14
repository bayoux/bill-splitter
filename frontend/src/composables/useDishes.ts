import { ref } from 'vue';
import type { Dish } from '@/types/dish';
import { api } from '@/api/instance';

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
    const { data } = await api.get<Dish[]>('/dishes');
    dishes.value = data;
  }

  async function addDish(name: string, price: number) {
    if (!validateDish(name, price)) return;

    loading.value = true;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', String(price));

    try {
      await api.post<Dish[]>('/dishes', formData);
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
      await api.delete(`/dishes/${id}`);
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
      await api.patch(`/dishes/${id}`, formData);
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
