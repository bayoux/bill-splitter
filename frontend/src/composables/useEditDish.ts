import { ref } from 'vue';
import type { Dish } from '@/types/dish';

export function useEditDish(
  editDish: (dish: Dish) => Promise<void>,
  validateDish: (name: string, price: number) => boolean,
) {
  const editingId = ref<number | null>(null);
  const editName = ref('');
  const editPrice = ref('');

  function startEdit(dish: Dish) {
    editingId.value = dish.id;
    editName.value = dish.name;
    editPrice.value = String(dish.price);
  }

  function cancelEdit() {
    editingId.value = null;
    editName.value = '';
    editPrice.value = '';
  }

  async function handleEdit() {
    if (!editingId.value) return;
    if (!validateDish(editName.value, Number(editPrice.value))) return;

    await editDish({
      id: editingId.value,
      name: editName.value,
      price: Number(editPrice.value),
    });

    cancelEdit();
  }

  return {
    editingId,
    editName,
    editPrice,
    startEdit,
    cancelEdit,
    handleEdit,
  };
}
