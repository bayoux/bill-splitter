<script setup lang="ts">
import { inject, onMounted, ref } from 'vue';
import { useQrCode } from '@/composables/useQrCode';
import { useEditDish } from '@/composables/useEditDish';
import { DishesContext } from '@/composables/useDishes';

const { dishes, loading, error, addDish, deleteDish, editDish } =
  inject<DishesContext>('dishes')!;
const { qrSrc, onQrUpload, deleteQrCode, getQrCode } = useQrCode();
const { editingId, editName, editPrice, startEdit, cancelEdit, handleEdit } =
  useEditDish(editDish);

const dishName = ref('');
const price = ref('');
const shareLink = ref('');

onMounted(async () => {
  await getQrCode();
});

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
            <i class="ti ti-x"></i>
          </button>
        </template>
      </li>
    </ul>

    <label class="add-dish-page__upload-label" for="qr-upload"
      >загрузить QR</label
    >
    <input
      class="add-dish-page__file-input"
      id="qr-upload"
      type="file"
      accept="image/*"
      @change="onQrUpload"
      style="display: none"
    />
    <div class="add-dish-page__qr">
      <img v-if="qrSrc" class="add-dish-page__image-qr" :src="qrSrc" alt="QR" />
      <button
        v-if="qrSrc"
        class="add-dish-page__delete-qr"
        @click="deleteQrCode"
      >
        удалить QR
      </button>
    </div>

    <button class="add-dish-page__share" @click="copyLink">
      поделиться с гостями
    </button>
    <p v-if="shareLink" class="add-dish-page__share-link">{{ shareLink }}</p>
  </div>
</template>

<style lang="scss">
.add-dish-page {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 100vw;
  padding: 1.25rem;

  &__header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  &__title {
    margin-top: 0.9375rem;
    padding-bottom: 1.875rem;
  }

  &__subtitle {
    margin-top: 0.9375rem;
    padding-bottom: 1.875rem;
  }

  &__input {
    width: 100%;
    margin-bottom: 0.625rem;
  }

  &__error {
    color: red;
    font-size: 0.8125rem;
  }

  &__button,
  &__delete-qr,
  &__share {
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
    gap: 0.75rem;
    margin-bottom: 1.25rem;
    border: 1px solid black;
    border-radius: 0.5rem;
    padding: 0.3125rem 0.625rem;
  }

  &__item-name {
    flex: 1;
  }

  &__item-price {
    min-width: 5rem;
    text-align: right;
  }

  &__item-edit,
  &__item-delete,
  &__item-confirm,
  &__item-cancel {
    cursor: pointer;
  }

  &__upload-label {
    width: 30%;
    margin-left: auto;
    text-align: center;
    font-size: 0.9375rem;
    padding: 0.5rem 0.625rem;
    margin-bottom: 0.9375rem;
    border-radius: var(--border-radius);
    color: var(--color-white);
    border: 1px solid var(--color-primary);
    background-color: var(--color-primary);
    cursor: pointer;
  }

  &__file-input {
    display: none;
  }

  &__qr {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 0.9375rem;
  }

  &__image-qr {
    width: 18.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__share-link {
    margin-top: 0.5rem;
    font-size: 0.8125rem;
  }
}
</style>
