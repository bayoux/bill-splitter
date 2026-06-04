import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import type { Dish } from '@/types/dish';
import { api } from '@/api/instance';

export function useDishes() {
  const dishes = ref<Dish[]>([]);
  const loading = ref(false);
  const toast = useToast();

  function validateDish(name: string, price: number) {
    if (!name.trim()) {
      toast.error('Название не должно быть пустым');
      return false;
    }
    if (price <= 0) {
      toast.error('Цена должна быть больше нуля');
      return false;
    }
    return true;
  }

  async function getDishes() {
    loading.value = true;

    try {
      const { data } = await api.get<Dish[]>('/dishes');
      dishes.value = data;
    } catch (e) {
      toast.error(
        e instanceof Error ? e.message : 'не удалось загрузить данные',
      );
    } finally {
      loading.value = false;
    }
  }

  async function addDish(name: string, price: number) {
    if (!validateDish(name, price)) return;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', String(price));

    try {
      await api.post<Dish[]>('/dishes', formData);
      await getDishes();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'не удалось добавить блюдо');
    }
  }

  async function deleteDish(id: number) {
    try {
      await api.delete(`/dishes/${id}`);
      await getDishes();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'не удалось удалить');
    }
  }

  async function editDish({ id, name, price }: Dish) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', String(price));

    try {
      await api.patch(`/dishes/${id}`, formData);
      await getDishes();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'не удалось обновить блюдо');
    }
  }

  return {
    dishes,
    loading,
    getDishes,
    addDish,
    deleteDish,
    editDish,
    validateDish,
  };
}

export type DishesContext = ReturnType<typeof useDishes>;
