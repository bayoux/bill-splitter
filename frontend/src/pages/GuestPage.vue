<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useDishes } from '@/composables/useDishes';
import type { Dish } from '@/types/dish';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

const { dishes, loading } = useDishes();
const selectedDishes = ref<Dish[]>([]);
const qrSrc = ref('');

const total = computed(() =>
  selectedDishes.value.reduce((sum, dish) => sum + Number(dish.price), 0),
);

onMounted(async () => {
  const { data } = await axios.get(`${API_URL}/qr-code`);
  if (data?.qrPath) {
    const normalizedPath = data.qrPath.replace(/\\/g, '/');
    qrSrc.value = `${API_URL}/${normalizedPath}`;
    console.log(qrSrc.value);
  }
});
</script>

<template>
  <div class="guest-page">
    <h3 class="guest-page__title">Выберите что вы ели</h3>

    <p v-if="loading">Загрузка...</p>

    <ul v-else class="guest-page__list">
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

    <div v-if="selectedDishes.length > 0" class="guest-page__total">
      <div class="guest-page__total-value">Итого: {{ total }} сом</div>
      <div class="guest-page__qr">
        <img
          v-if="qrSrc"
          class="guest-page__image-qr"
          alt="qrCode"
          :src="qrSrc"
        />
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

  &__total {
    display: flex;
    flex-direction: column;
    margin-top: 24px;
  }

  &__total-value {
    text-align-last: end;
    width: 30%;
    margin-left: auto;
    font-size: 15px;
    font-weight: bold;
    padding: 8px 0 8px 10px;
    border-radius: var(--border-radius);
    color: var(--color-charcoal);
    margin-bottom: 30px;
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
}
</style>
