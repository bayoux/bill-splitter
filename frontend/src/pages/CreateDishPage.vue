<script setup lang="ts">
import { inject, onMounted, ref } from 'vue';
import { useQrCode } from '@/composables/useQrCode';
import { useEditDish } from '@/composables/useEditDish';
import { DishesContext } from '@/composables/useDishes';
import { useShareLink } from '@/composables/useShareLink';
import BaseButton from '@/components/BaseButton.vue';

const { dishes, loading, error, addDish, deleteDish, editDish } =
  inject<DishesContext>('dishes')!;
const { qrSrc, onQrUpload, deleteQrCode, getQrCode } = useQrCode();
const { editingId, editName, editPrice, startEdit, cancelEdit, handleEdit } =
  useEditDish(editDish);
const { shareLink, copyLink } = useShareLink();

const dishName = ref('');
const price = ref('');

onMounted(async () => {
  await getQrCode();
});

async function handleAdd() {
  const parsedPrice = Number(price.value);

  await addDish(dishName.value, parsedPrice);

  dishName.value = '';
  price.value = '';
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
      <BaseButton variant="primary" @click="handleAdd">добавить</BaseButton>
    </div>
    <h3 class="add-dish-page__title">Список блюд:</h3>
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
          <BaseButton variant="icon" @click="handleEdit"> ✓ </BaseButton>
          <BaseButton variant="icon" @click="cancelEdit"> ✕ </BaseButton>
        </template>

        <template v-else>
          <p class="add-dish-page__name">{{ dish.name }}</p>
          <p class="add-dish-page__price">{{ dish.price }} сом</p>
          <BaseButton variant="icon" @click="startEdit(dish)">
            <i class="ti ti-edit"></i>
          </BaseButton>
          <BaseButton variant="icon" @click="deleteDish(dish.id)">
            <i class="ti ti-x"></i>
          </BaseButton>
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
    <div class="qr">
      <img v-if="qrSrc" class="image-qr" :src="qrSrc" alt="QR" />
      <BaseButton variant="danger" v-if="qrSrc" @click="deleteQrCode">
        удалить QR
      </BaseButton>
    </div>

    <BaseButton variant="primary" @click="copyLink">
      поделиться с гостями
    </BaseButton>
    <p v-if="shareLink" class="add-dish-page__share-link">{{ shareLink }}</p>
  </div>
</template>

<style lang="scss">
.add-dish-page {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 100vw;
  padding: 1.5rem;

  &__header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  &__title {
    margin-top: 1rem;
    padding-bottom: 1rem;
  }

  &__error {
    color: var(--color-red);
    font-size: 0.8rem;
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
    gap: 1rem;
    margin-bottom: 1rem;
    border: 1px solid var(--color-input-border);
    border-radius: 0.5rem;
    padding: 0.3rem 0.6rem;
  }

  &__name {
    flex: 1;
  }

  &__price {
    min-width: 5rem;
    text-align: right;
  }

  &__upload-label {
    width: 30%;
    margin-left: auto;
    text-align: center;
    font-size: 0.9rem;
    padding: 0.5rem 0.6rem;
    margin-bottom: 1rem;
    border-radius: var(--border-radius);
    color: var(--color-white);
    background-color: var(--color-primary);
  }

  &__file-input {
    display: none;
  }

  &__share-link {
    margin-top: 0.5rem;
    font-size: 0.8rem;
  }
}
</style>
