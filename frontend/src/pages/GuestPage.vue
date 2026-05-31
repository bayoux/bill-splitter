<script setup lang="ts">
import { ref, computed, onMounted, inject } from 'vue';
import { DishesContext } from '@/composables/useDishes';
import { useQrCode } from '@/composables/useQrCode';
import type { Dish } from '@/types/dish';
import BaseButton from '@/components/BaseButton.vue';

const { dishes, loading, getDishes } = inject<DishesContext>('dishes')!;
const { qrSrc, getQrCode } = useQrCode();

const selectedDishes = ref<Dish[]>([]);
const total = computed(() =>
  selectedDishes.value.reduce((sum, dish) => sum + Number(dish.price), 0),
);

onMounted(async () => {
  await getQrCode();
  console.log(qrSrc.value);
});
</script>

<template>
  <div class="guest-page">
    <div class="guest-page__qr">
      <img v-if="qrSrc" class="guest-page__qr-img" :src="qrSrc" alt="QR" />
      <div class="guest-page__total">
        <h2 class="guest-page__total-value">{{ total }} сом</h2>
      </div>
    </div>

    <BaseButton variant="secondary" @click="getDishes()">Обновить </BaseButton>

    <p v-if="loading">Загрузка...</p>

    <ul v-else class="guest-page__list">
      <li class="guest-page__item" v-for="dish in dishes" :key="dish.id">
        <input
          v-model="selectedDishes"
          class="guest-page__checkbox"
          type="checkbox"
          :value="dish"
        />
        <div class="guest-page__info">
          <p class="guest-page__name">{{ dish.name }}</p>
          <p class="guest-page__price">{{ dish.price }} сом</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.guest-page {
  display: flex;
  flex-direction: column;
  padding: 0.5rem;

  &__qr {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    margin-bottom: 1rem;
    width: 100%;
    max-width: 35rem;
    background-color: var(--color-white);
    border-radius: var(--border-radius-md);
  }

  &__qr-img {
    width: 100%;
    max-width: 14rem;
    object-fit: contain;
    border-radius: var(--border-radius-lg);
  }

  &__total-value {
    width: 100%;
    max-width: 15rem;
    font-size: var(--font-size-md);
    padding: 1.5rem;
    color: var(--color-muted-purple);
    font-weight: var(--font-weight-medium);
  }

  &__title {
    margin-bottom: 1rem;
  }

  &__list {
    list-style: none;
    padding: 0;
    margin-top: 1rem;
    overflow: hidden;
    background-color: var(--color-white);
    border-radius: var(--border-radius-md);
    border: 1px solid var(--color-secondary);
  }

  &__item {
    max-width: 35rem;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.6rem 1rem 0.6rem 1rem;
    border-bottom: 0.1rem solid var(--color-secondary);
  }

  &__checkbox {
    width: 1.3rem;
    height: 1.3rem;
    margin: 0;
    accent-color: var(--color-secondary);
  }

  &__name {
    flex: 1;
  }

  &__info {
    width: 100%;
    max-width: 35rem;
    display: flex;
    flex-direction: column;
  }

  &__name {
    color: var(--color-dark);
  }

  &__price {
    color: var(--color-muted-purple);
  }
}
</style>
