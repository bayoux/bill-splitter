<script setup lang="ts">
import { ref, computed } from 'vue';
import { useDishes } from '@/composables/useDishes';
import type { Dish } from '@/types/dish';

const { dishes, loading } = useDishes();
const selectedDishes = ref<Dish[]>([]);

const total = computed(() =>
  selectedDishes.value.reduce((sum, dish) => sum + Number(dish.price), 0),
);

const qrSrc = computed(
  () =>
    `${import.meta.env.VITE_QR_API_URL}?size=200x200&data=Итого:${total.value}сом`,
);
</script>

<template>
  <div class="guest-page">
    <h3 class="guest-page__title">Выберите что вы ели</h3>

    <p v-if="loading">Загрузка...</p>

    <ul class="guest-page__list">
      <li class="guest-page__item" v-for="dish in dishes" :key="dish.id">
        <input
          v-model="selectedDishes"
          class="guest-page__checkbox"
          type="checkbox"
          :value="dish"
        />
        <span class="guest-page__name">{{ dish.name }}</span>
        <span class="guest-page__price">{{ dish.price }} сом</span>
      </li>
    </ul>

    <div v-if="selectedDishes.length > 0" class="total-section">
      <div class="total-section__value">Итого: {{ total }} сом</div>
      <div class="total-section__qr-wrapper">
        <img class="total-section__qr-code" alt="qrCode" :src="qrSrc" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.guest-page {
  display: flex;
  flex-direction: column;
  padding: 20px;

  &__title {
    margin-bottom: 16px;
  }

  &__list {
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 8px;
  }

  &__checkbox {
    width: 20px;
    height: 20px;
    margin: 0;
  }

  &__name {
    flex: 1;
  }

  &__price {
    min-width: 80px;
    text-align: right;
  }
}

.total-section {
  display: flex;
  flex-direction: column;
  margin-top: 24px;

  &__value {
    width: 30%;
    margin-left: auto;
    font-size: 15px;
    padding: 8px 10px;
    border-radius: var(--border-radius);
    color: var(--color-white);
    border: 1px solid var(--color-primary);
    background-color: var(--color-primary);
    cursor: pointer;
    margin-bottom: 30px;
  }

  &__qr-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
