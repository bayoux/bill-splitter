import { ref, type Ref } from 'vue';
import { useToast } from 'vue-toastification';
import type { Dish } from '@/entities/dish';
import { api } from '@/shared/api/instance';

export function useDishes(sessionId: Ref<string>) {
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
    if (!sessionId.value) return;
    loading.value = true;

    try {
      const { data } = await api.get<Dish[]>(
        `/sessions/${sessionId.value}/dishes`,
      );
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
    if (!sessionId.value) return;
    if (!validateDish(name, price)) return;

    try {
      await api.post(`/sessions/${sessionId.value}/dishes`, { name, price });
      await getDishes();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'не удалось добавить блюдо');
    }
  }

  async function deleteDish(id: number) {
    if (!sessionId.value) return;

    try {
      await api.delete(`/sessions/${sessionId.value}/dishes/${id}`);
      await getDishes();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'не удалось удалить');
    }
  }

  async function editDish({ id, name, price }: Dish) {
    if (!sessionId.value) return;

    try {
      await api.patch(`/sessions/${sessionId.value}/dishes/${id}`, {
        name,
        price,
      });
      await getDishes();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'не удалось обновить блюдо');
    }
  }

  function resetDishes() {
    dishes.value = [];
  }

  return {
    dishes,
    loading,
    getDishes,
    addDish,
    deleteDish,
    editDish,
    validateDish,
    resetDishes,
  };
}

export type DishesContext = ReturnType<typeof useDishes>;
