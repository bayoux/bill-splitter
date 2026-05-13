<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Dish } from '@/types/dish';
import { useDishes } from '@/composables/useDishes';
import { useQrCode } from '@/composables/useQrCode';

const { dishes, loading, error, getDishes, addDish, deleteDish, editDish } =
  useDishes();
const { deleteQrCode } = useQrCode();

const dishName = ref('');
const price = ref('');
const shareLink = ref('');
const editingId = ref<number | null>(null);
const editName = ref('');
const editPrice = ref('');
const { qrSrc, onQrUpload } = useQrCode();

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
  await editDish({
    id: editingId.value,
    name: editName.value,
    price: Number(editPrice.value),
  });
  cancelEdit();
}

async function handleAdd() {
  const parsedPrice = Number(price.value);
  await addDish(dishName.value, parsedPrice);
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
        class="add-dish-page__input"
        type="text"
        v-model="dishName"
        placeholder="название блюда:"
        required
      />
      <input
        class="add-dish-page__input"
        v-model="price"
        type="number"
        placeholder="цена:"
        required
      />

      <p class="add-dish-page__error">{{ error }}</p>
      <button class="add-dish-page__button" @click="handleAdd">добавить</button>
    </div>

    <h3 class="add-dish-page__subtitle">Список блюд:</h3>
    <p v-if="loading">Загрузка...</p>

    <ul class="add-dish-page__list">
      <li class="add-dish-page__item" v-for="dish in dishes" :key="dish.id">
        <template v-if="editingId === dish.id">
          <input class="add-dish-page__input" v-model="editName" type="text" />
          <input
            class="add-dish-page__input"
            v-model="editPrice"
            type="number"
          />
          <button class="add-dish-page__item-confirm" @click="handleEdit">
            ✓
          </button>
          <button class="add-dish-page__item-cancel" @click="cancelEdit">
            ✕
          </button>
        </template>

        <template v-else>
          <p class="add-dish-page__item-name">{{ dish.name }}</p>
          <p class="add-dish-page__item-price">{{ dish.price }} сом</p>
          <button class="add-dish-page__item-edit" @click="startEdit(dish)">
            <i class="ti ti-edit"></i>
          </button>
          <button
            class="add-dish-page__item-delete"
            @click="deleteDish(dish.id)"
          >
            X
          </button>
        </template>
      </li>
    </ul>

    <label class="add-dish-page__button" for="qr-upload">загрузить QR</label>
    <input
      id="qr-upload"
      type="file"
      accept="image/*"
      @change="onQrUpload"
      style="display: none"
    />
    <div class="add-dish-page__qr">
      <img v-if="qrSrc" class="add-dish-page__image-qr" :src="qrSrc" alt="QR" />
      <button v-if="qrSrc" @click="deleteQrCode">удалить QR</button>
    </div>

    <button class="add-dish-page__share" @click="copyLink">
      Поделиться с гостями
    </button>
    <p v-if="shareLink" class="add-dish-page__share-link">{{ shareLink }}</p>
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

  &__title {
    margin-top: 15px;
    padding-bottom: 30px;
  }

  &__subtitle {
    margin-top: 15px;
    padding-bottom: 30px;
  }

  &__input {
    width: 100%;
    margin-bottom: 10px;
  }

  &__error {
    color: red;
    font-size: 13px;
  }

  &__button {
    width: 30%;
    margin-left: auto;
  }

  &__list {
    width: 100%;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
    border: 1px solid black;
    border-radius: 8px;
    padding: 5px 10px;
  }

  &__item-name {
    flex: 1;
  }

  &__item-price {
    min-width: 80px;
    text-align: right;
  }

  &__item-edit,
  &__item-delete,
  &__item-confirm,
  &__item-cancel {
    cursor: pointer;
  }

  label {
    text-align: center;
    font-size: 15px;
    padding: 8px 10px;
    margin-bottom: 15px;
    border-radius: var(--border-radius);
    color: var(--color-white);
    border: 1px solid var(--color-primary);
    background-color: var(--color-primary);
    cursor: pointer;
  }

  &__qr {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__image-qr {
    width: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__share {
    width: 30%;
    margin-left: auto;
  }

  &__share-link {
    margin-top: 8px;
    font-size: 13px;
  }
}
</style>
