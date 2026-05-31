<script setup lang="ts">
import { inject, ref } from 'vue';
import { useEditDish } from '@/composables/useEditDish';
import { DishesContext } from '@/composables/useDishes';
import BaseButton from '@/components/BaseButton.vue';
import QrUpload from '@/components/QrUpload.vue';
import {
  IconPlus,
  IconBowlSpoonFilled,
  IconPencilFilled,
  IconTrashFilled,
} from '@tabler/icons-vue';

const { dishes, loading, addDish, deleteDish, editDish } =
  inject<DishesContext>('dishes')!;

const { editingId, editName, editPrice, startEdit, cancelEdit, handleEdit } =
  useEditDish(editDish);

const dishName = ref('');
const price = ref('');
const editPopup = ref(false);

async function handleAdd() {
  const parsedPrice = Number(price.value);

  await addDish(dishName.value, parsedPrice);

  dishName.value = '';
  price.value = '';
}
</script>

<template>
  <div class="add-dish-page">
    <QrUpload />
    <div class="add-dish-page__header">
      <input
        class="add-dish-page__input add-dish-page__input--name"
        type="text"
        v-model="dishName"
        placeholder="Название блюда"
        required
      />
      <input
        class="add-dish-page__input add-dish-page__input--price"
        v-model="price"
        type="number"
        placeholder="Цена"
        required
      />

      <BaseButton
        variant="primary"
        class="add-dish-page__button add-dish-page__button--add"
        @click="handleAdd"
      >
        <IconPlus stroke="2" />
        Добавить
      </BaseButton>
    </div>

    <p v-if="loading">Загрузка...</p>

    <ul class="add-dish-page__list">
      <li class="add-dish-page__item" v-for="dish in dishes" :key="dish.id">
        <template v-if="editingId === dish.id">
          <div
            v-if="editPopup"
            class="add-dish-page__overlay"
            @click="
              editPopup = false;
              cancelEdit();
            "
          >
            <div class="add-dish-page__edit-popup" @click.stop>
              <div class="add-dish-page__edit-actions">
                <h3 class="add-dish-page__title">Редактировать</h3>
                <div class="add-dish-page__fields">
                  <input
                    class="add-dish-page__input add-dish-page__input--edit-name"
                    type="text"
                    v-model="editName"
                    placeholder="Название блюда"
                    required
                  />
                  <input
                    class="add-dish-page__input add-dish-page__input--edit-price"
                    v-model="editPrice"
                    type="number"
                    placeholder="Цена"
                    required
                  />
                </div>
              </div>

              <div class="add-dish-page__edit-buttons">
                <BaseButton
                  class="add-dish-page__button add-dish-page__button--cancel"
                  variant="ghost"
                  @click="
                    cancelEdit();
                    editPopup = false;
                  "
                >
                  Отменить
                </BaseButton>
                <BaseButton
                  class="add-dish-page__button add-dish-page__button--save"
                  variant="primary"
                  @click="handleEdit"
                >
                  Сохранить
                </BaseButton>
              </div>
            </div>
          </div>
        </template>

        <template v-else>
          <IconBowlSpoonFilled
            class="add-dish-page__icon add-dish-page__icon--bowl"
          />

          <div class="add-dish-page__info">
            <p class="add-dish-page__name">{{ dish.name }}</p>
            <p class="add-dish-page__price">{{ dish.price }} сом</p>
          </div>

          <BaseButton
            variant="icon"
            @click="
              startEdit(dish);
              editPopup = true;
            "
          >
            <IconPencilFilled />
          </BaseButton>
          <BaseButton variant="icon" @click="deleteDish(dish.id)">
            <IconTrashFilled />
          </BaseButton>
        </template>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.add-dish-page {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  max-width: 36rem;
  margin: 0 auto;
  padding: 1rem 1rem 0;

  &__icon {
    color: var(--color-icon);
    &--bowl {
      width: var(--icon-sm);
      height: var(--icon-sm);
    }
  }

  &__header {
    display: flex;
    align-items: center;
    margin: 1rem 0;
    gap: 0.5rem;
    width: 100%;
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
    overflow: hidden;
    border-radius: var(--border-radius-md);
    border: 0.1rem solid var(--color-secondary);
  }

  &__item {
    width: 100%;
    min-height: 4rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    border-bottom: 0.1rem solid var(--color-secondary);
    background-color: var(--color-white);
    padding: 0.6rem 1rem;
  }

  &__info {
    width: 100%;
    max-width: 26rem;
    display: flex;
    flex-direction: column;
  }

  &__name {
    color: var(--color-dark);
  }

  &__price {
    color: var(--color-muted-purple);
  }

  &__overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  &__edit-popup {
    background: var(--color-white);
    border-radius: var(--border-radius-lg);
    border: 0.1rem solid var(--color-light-lavender);
    padding: 1.5rem;
    width: 100%;
    max-width: 26rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__edit-actions {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 0.5rem;
  }

  &__title {
    padding-left: 0.5rem;
    padding-bottom: 0.5rem;
    font-size: var(--font-size-md);
    font-weight: 400;
    color: var(--color-dark);
  }

  &__fields {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__input {
    max-width: 23rem;
    min-height: 3.5rem;
    border-radius: var(--border-radius-lg);
    border: 0.1rem solid transparent;
    color: var(--color-dark);

    &--name {
      width: 0;
      flex: 2;
      max-width: 15rem;
    }

    &--price {
      width: 0;
      flex: 1;
    }

    &--edit-name,
    &--edit-price {
      background-color: var(--color-light-lavender);
    }

    &:hover {
      border-color: var(--color-primary);
    }

    &::placeholder {
      color: var(--color-dark);
      opacity: 1;
    }
  }
  &__edit-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }

  &__button {
    width: 100%;
    min-height: 3.5rem;

    &--add {
      max-width: 8.2rem;
    }
    &--cancel {
      max-width: 6.2rem;
      min-height: 2.5rem;
    }

    &--save {
      max-width: 6.4rem;
    }
  }
}
</style>
