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
});
</script>

<template>
  <div class="guest-page">
    <h3 class="guest-page__title">Выберите что вы ели</h3>

    <BaseButton variant="secondary" @click="getDishes()"
      >обновить список</BaseButton
    >

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
      <div class="qr">
        <img v-if="qrSrc" class="image-qr" alt="qrCode" :src="qrSrc" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.guest-page {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;

  &__title {
    margin-bottom: 1rem;
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
    gap: 1rem;
    margin-bottom: 0.5rem;
  }

  &__checkbox {
    width: 1.3rem;
    height: 1.3rem;
    margin: 0;
  }

  &__name {
    flex: 1;
  }

  &__price {
    min-width: 5rem;
    text-align: right;
  }

  &__total {
    display: flex;
    flex-direction: column;
    margin-top: 1.5rem;
  }

  &__total-value {
    text-align-last: end;
    width: 30%;
    margin-left: auto;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.5rem 0 0.5rem 0.6rem;
    border-radius: var(--border-radius);
    color: var(--color-charcoal);
    margin-bottom: 1.8rem;
  }
}
</style>
