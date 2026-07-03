<script setup lang="ts">
import AppHeader from '@/widgets/app-header/index.vue';

defineOptions({ name: 'CreatePage' });
import { inject, ref } from 'vue';
import {
  IconPlus,
  IconBowlSpoonFilled,
  IconPencilFilled,
  IconTrashFilled,
} from '@tabler/icons-vue';

import QrUpload from '@/widgets/qr-upload/index.vue';
import { useEditDish, type DishesContext } from '@/features/manage-dishes';
import BaseButton from '@/shared/ui/BaseButton.vue';
import { useCreateSession } from '@/features/create-session';
import AppFooter from '@/widgets/app-footer/index.vue';

const {
  dishes,
  loading,
  addDish,
  deleteDish,
  editDish,
  validateDish,
  clearDishes,
} = inject<DishesContext>('dishes')!;

const { editingId, editName, editPrice, startEdit, cancelEdit, handleEdit } =
  useEditDish(editDish, validateDish);

const { sessionName, isSessionCreated, handleCreate } = useCreateSession(
  dishes,
  clearDishes,
);

const dishName = ref('');
const price = ref('');

async function handleAdd() {
  const parsedPrice = Number(price.value);

  await addDish(dishName.value, parsedPrice);

  dishName.value = '';
  price.value = '';
}
</script>
<template>
  <div class="add-dish-page">
    <AppHeader />

    <div class="add-dish-page__content">
      <QrUpload />

      <div class="add-dish-page__header">
        <input
          v-model="dishName"
          class="add-dish-page__input add-dish-page__input--name"
          type="text"
          placeholder="Название блюда"
          required
        />
        <input
          v-model="price"
          class="add-dish-page__input add-dish-page__input--price"
          type="number"
          placeholder="Цена"
          required
        />

        <BaseButton
          variant="primary"
          class="add-dish-page__button add-dish-page__button--add"
          @click="handleAdd"
        >
          <IconPlus />
          Добавить
        </BaseButton>
      </div>

      <p v-if="loading">Загрузка...</p>

      <ul v-if="dishes.length" class="add-dish-page__list">
        <li v-for="dish in dishes" :key="dish.id" class="add-dish-page__item">
          <IconBowlSpoonFilled
            class="add-dish-page__icon add-dish-page__icon--bowl"
          />

          <div class="add-dish-page__info">
            <p class="add-dish-page__name">
              {{ dish.name }}
            </p>
            <p class="add-dish-page__price">{{ dish.price }} сом</p>
          </div>

          <BaseButton
            variant="icon"
            style="flex-shrink: 0"
            @click="startEdit(dish)"
          >
            <IconPencilFilled />
          </BaseButton>
          <BaseButton
            variant="icon"
            style="flex-shrink: 0"
            @click="deleteDish(dish.id)"
          >
            <IconTrashFilled />
          </BaseButton>
        </li>
      </ul>

      <div
        v-if="editingId"
        class="add-dish-page__overlay"
        @click="cancelEdit()"
      >
        <div class="add-dish-page__edit-popup" @click.stop>
          <div class="add-dish-page__edit-actions">
            <h3 class="add-dish-page__title">Редактировать</h3>
            <div class="add-dish-page__fields">
              <input
                v-model="editName"
                class="add-dish-page__input add-dish-page__input--edit-name"
                type="text"
                placeholder="Название блюда"
                required
              />
              <input
                v-model="editPrice"
                class="add-dish-page__input add-dish-page__input--edit-price"
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
              @click="cancelEdit()"
            >
              Отменить
            </BaseButton>
            <BaseButton
              class="add-dish-page__button add-dish-page__button--save"
              variant="primary"
              @click="handleEdit()"
            >
              Сохранить
            </BaseButton>
          </div>
        </div>
      </div>

      <div
        v-if="dishes.length && !isSessionCreated"
        class="add-dish-page__session"
      >
        <input
          v-model="sessionName"
          class="add-dish-page__input add-dish-page__input--session-name"
          type="text"
          placeholder="Название сессии"
          required
        />

        <BaseButton
          class="add-dish-page__button add-dish-page__button--create"
          variant="secondary"
          @click="handleCreate()"
        >
          Создать
        </BaseButton>
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<style lang="scss">
.add-dish-page {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  max-width: 36rem;
  min-height: 100dvh;
  margin: 0 auto;

  &__content {
    padding: 1rem;
  }

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
    border-radius: var(--border-radius-sm);
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
    flex: 1;
    min-width: 0;
    max-width: 26rem;
    display: flex;
    flex-direction: column;
  }

  &__name {
    color: var(--color-dark);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__price {
    color: var(--color-muted-purple);
    white-space: nowrap;
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
    border-radius: var(--border-radius-md);
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
    min-height: 3.5rem;
    border-radius: var(--border-radius-md);
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

  &__session {
    display: flex;
    flex-direction: row;
    margin: 1rem 0;
    gap: 0.5rem;
  }

  @media (max-width: 480px) {
    &__header {
      flex-direction: column;
      align-items: stretch;
      gap: 0.7rem;
    }

    &__input--name,
    &__input--price {
      width: 100%;
      max-width: 100%;
      flex: none;
    }

    &__button--add {
      max-width: 100%;
      width: 100%;
    }
  }
}
</style>
