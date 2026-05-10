<script setup lang="ts">
import { ref } from 'vue';
import type { Dish } from '@/types/dish';
import { useDishes } from '@/composables/useDishes';

const { dishes, loading, error, addDish, deleteDish, editDish } = useDishes();

const dishName = ref('');
const price = ref('');
const shareLink = ref('');
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
  await editDish(editingId.value, editName.value, Number(editPrice.value));
  cancelEdit();
}

async function handleAdd() {
  if (dishName.value === '' || price.value === '') {
    error.value = 'Поля не должны быть пустыми';
    return;
  }
  error.value = '';
  await addDish(dishName.value, Number(price.value));
  dishName.value = '';
  price.value = '';
}

function copyLink() {
  shareLink.value = `${window.location.origin}/guest`;
  navigator.clipboard.writeText(shareLink.value);
  alert('Ссылка скопирована!');
}
</script>

<template>
  <div class="add-dish-page">
    <div class="add-dish-page__header">
      <h3 class="add-dish-page__title">Добавить блюдо</h3>

      <input
        type="text"
        v-model="dishName"
        placeholder="название блюда:"
        required
      />
      <input v-model="price" type="number" placeholder="цена:" required />

      <p class="add-dish-page-error">{{ error }}</p>
      <button class="add-dish-page__button" @click="handleAdd()">
        добавить
      </button>
    </div>

    <h3 class="dish-list__title">Список блюд:</h3>
    <p v-if="loading">Загрузка...</p>

    <ul class="dish-list">
      <li class="dish-item" v-for="dish in dishes" :key="dish.id">
        <template v-if="editingId === dish.id">
          <input v-model="editName" type="text" />
          <input v-model="editPrice" type="number" />
          <button @click="handleEdit()">✓</button>
          <button @click="cancelEdit()">✕</button>
        </template>

        <template v-else>
          <p class="dish-item__name">{{ dish.name }}</p>
          <p class="dish-item__price">{{ dish.price }} сом</p>
          <button @click="startEdit(dish)" type="button">
            <i class="ti ti-edit"></i>
          </button>
          <button @click="deleteDish(dish.id)" type="button">X</button>
        </template>
      </li>
    </ul>

    <button class="share-btn" @click="copyLink" type="button">
      Поделиться с гостями
    </button>
    <p v-if="shareLink">{{ shareLink }}</p>
  </div>
</template>

<style scoped lang="scss">
.add-dish-page {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 100vw;
  padding: 20px;

  &__header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  &__button {
    width: 30%;
    margin-left: auto;
  }

  &__error {
    color: red;
    font-size: 13px;
  }
}

.dish-list {
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;

  &__title {
    margin-top: 15px;
    padding-bottom: 30px;
  }
}

.dish-item {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
  border: 1px solid black;
  border-radius: 8px;
  padding: 10px;

  &__name {
    flex: 1;
  }

  &__price {
    min-width: 80px;
    text-align: right;
  }
}

.share-btn {
  width: 30%;
  margin-left: auto;
}
</style>
