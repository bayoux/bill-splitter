<script setup lang="ts">
import AppHeader from '@/widgets/app-header/index.vue';

defineOptions({ name: 'SessionManagePage' });
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import {
  IconCopy,
  IconSquareRoundedFilled,
  IconChevronLeft,
  IconPencil,
  IconTrash,
} from '@tabler/icons-vue';
import { useSessionSummary } from '@/entities/session';
import { useQrCodeStore } from '@/entities/qr-code';
import { useShareLink } from '@/features/share-link';
import BaseButton from '@/shared/ui/BaseButton.vue';
import ConfirmModal from '@/shared/ui/ConfirmModal.vue';
import router from '@/app/router';
import { useDishes } from '@/features/manage-dishes';
import { Dish } from '@/entities/dish';

const route = useRoute();
const sessionId = route.params.sessionId as string;
const sessionIdRef = ref(sessionId);
const {
  dishes,
  loading: dishesLoading,
  getDishes,
  addDish,
  editDish,
  deleteDish,
} = useDishes(sessionIdRef);
const { summary, loading, getSummary, finishSession } =
  useSessionSummary(sessionId);
const qrStore = useQrCodeStore();
const { copyLink } = useShareLink();
const showFinishModal = ref(false);
const newDishName = ref('');
const newDishPrice = ref<number | null>(null);
const editingDishId = ref<number | null>(null);

async function handleFinish() {
  const ok = await finishSession();
  if (ok) {
    router.push('/dashboard');
  }
}

function getParticipantText(count: number) {
  if (count % 10 === 1 && count % 100 !== 11) {
    return 'участник';
  }

  if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
    return 'участника';
  }

  return 'участников';
}

function goBack() {
  router.push('/dashboard');
}

async function handleAddDish() {
  if (!newDishName.value || !newDishPrice.value) return;
  await addDish(newDishName.value, Number(newDishPrice.value));
  newDishName.value = '';
  newDishPrice.value = null;
}

function startEdit(dish: Dish) {
  editingDishId.value = dish.id;
  newDishName.value = dish.name;
  newDishPrice.value = Number(dish.price);
}

async function handleSaveEdit() {
  if (editingDishId.value === null || !newDishName.value || !newDishPrice.value)
    return;
  await editDish({
    id: editingDishId.value,
    name: newDishName.value,
    price: Number(newDishPrice.value),
  });
  editingDishId.value = null;
  newDishName.value = '';
  newDishPrice.value = null;
}

async function handleDeleteDish(id: number) {
  await deleteDish(id);
}

function cancelEdit() {
  editingDishId.value = null;
  newDishName.value = '';
  newDishPrice.value = null;
}

onMounted(async () => {
  await qrStore.getQrCode();
  await getSummary();
  await getDishes();
});
</script>

<template>
  <div class="session-manage-page">
    <AppHeader>
      <BaseButton
        variant="icon"
        @click="goBack()"
        class="all-sessions__button all-sessions__button--logout"
      >
        <IconChevronLeft />
      </BaseButton>
    </AppHeader>

    <div v-if="summary" class="session-manage-page__content">
      <div class="session-manage-page__heading">
        <div class="session-manage-page__title-row">
          <h2 class="session-manage-page__name">{{ summary.sessionName }}</h2>
          <div class="session-manage-page__status-info">
            <span
              class="session-manage-page__status"
              :class="{
                'session-manage-page__status--active': !summary.isExpired,
                'session-manage-page__status--expired': summary.isExpired,
              }"
            >
              {{ summary.isExpired ? 'Завершена' : 'Активна' }}
            </span>
            <span class="session-manage-page__count">
              {{ summary.participantCount }}
              {{ getParticipantText(summary.participantCount) }}
            </span>
          </div>
        </div>
        <BaseButton
          v-if="!summary.isExpired"
          variant="primary"
          class="session-manage-page__copy-button"
          @click="copyLink(sessionId)"
        >
          <IconCopy />
          Ссылка
        </BaseButton>
      </div>

      <div
        v-if="qrStore.qrSrc && !summary.isExpired"
        class="session-manage-page__qr-card"
      >
        <img
          class="session-manage-page__qr-img"
          :src="qrStore.qrSrc"
          alt="QR"
        />
        <h2 class="session-manage-page__total">{{ summary.grandTotal }} сом</h2>
        <p class="session-manage-page__qr-hint">
          Покажите гостям, чтобы присоединиться
        </p>
      </div>

      <div
        v-if="!summary.isExpired"
        class="session-manage-page__dishes-section"
      >
        <h3 class="session-manage-page__dishes-title">Меню</h3>

        <form
          class="session-manage-page__dish-form"
          @submit.prevent="editingDishId ? handleSaveEdit() : handleAddDish()"
        >
          <div class="session-manage-page__dish-inputs">
            <input
              v-model="newDishName"
              class="session-manage-page__dish-input"
              placeholder="Название"
            />
            <input
              v-model.number="newDishPrice"
              class="session-manage-page__dish-input"
              type="number"
              placeholder="Цена"
            />
          </div>

          <div class="session-manage-page__dish-form-actions">
            <BaseButton
              class="session-manage-page__dish-submit"
              variant="primary"
              type="submit"
            >
              {{ editingDishId ? 'Сохранить' : 'Добавить' }}
            </BaseButton>

            <BaseButton
              v-if="editingDishId"
              variant="secondary"
              type="button"
              @click="cancelEdit"
            >
              Отмена
            </BaseButton>
          </div>
        </form>

        <p v-if="dishesLoading">Загрузка блюд...</p>

        <ul v-else class="session-manage-page__dish-list">
          <li
            v-for="dish in dishes"
            :key="dish.id"
            class="session-manage-page__dish-item"
          >
            <span class="session-manage-page__dish-name">
              <span class="session-manage-page__dish-name-text">{{
                dish.name
              }}</span>
              <span class="session-manage-page__dish-price"
                >{{ dish.price }} сом</span
              >
            </span>
            <div class="session-manage-page__dish-actions">
              <BaseButton variant="icon" @click="startEdit(dish)"
                ><IconPencil
              /></BaseButton>
              <BaseButton variant="icon" @click="handleDeleteDish(dish.id)"
                ><IconTrash
              /></BaseButton>
            </div>
          </li>
        </ul>
      </div>

      <p v-if="loading">Загрузка...</p>

      <ul v-else class="session-manage-page__list">
        <li
          v-for="participant in summary.participants"
          :key="participant.participantId"
          class="session-manage-page__item"
        >
          <div class="session-manage-page__info">
            <p class="session-manage-page__participant-name">
              {{ participant.name }}
            </p>
            <p class="session-manage-page__dishes">
              {{ participant.dishes.join(', ') || 'Ничего не выбрано' }}
            </p>
          </div>
          <p class="session-manage-page__participant-total">
            {{ participant.total }} сом
          </p>
        </li>
      </ul>

      <div v-if="!summary.isExpired" class="session-manage-page__footer">
        <BaseButton
          variant="danger"
          class="session-manage-page__finish-button"
          @click="showFinishModal = true"
        >
          <IconSquareRoundedFilled />
          Завершить сессию
        </BaseButton>
      </div>
    </div>

    <ConfirmModal
      v-if="showFinishModal"
      title="Завершить сессию?"
      description="Гости больше не смогут выбирать блюда"
      confirm-text="Завершить"
      cancel-text="Отмена"
      @confirm="handleFinish"
      @cancel="showFinishModal = false"
    />
  </div>
</template>

<style lang="scss">
.session-manage-page {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  max-width: 36rem;
  min-height: 100dvh;
  margin: 0 auto;

  &__content {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  &__heading {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 1rem;
  }

  &__title-row {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
  }

  &__name {
    padding: 0 0.5rem;
    color: var(--color-dark);
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-medium);
  }

  &__copy-button {
    min-height: 2rem;
    margin-top: 1rem;
    border-radius: var(--border-radius-lg);
  }

  &__status-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  &__status {
    padding: 0.25rem 0.5rem;
    border-radius: var(--border-radius-md);
    font-size: var(--font-size-sm);

    &--active {
      background-color: var(--color-light-green);
      color: var(--color-green);
    }

    &--expired {
      background-color: var(--color-light-purple);
      color: var(--color-primary);
    }
  }

  &__count {
    color: var(--color-muted-purple);
    font-size: var(--font-size-sm);
  }

  &__qr-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.5rem 1rem;
    margin-bottom: 1rem;
    background-color: var(--color-white);
    border-radius: var(--border-radius-sm);
  }

  &__qr-img {
    width: 100%;
    max-width: 14rem;
    margin-bottom: 1rem;
    border-radius: var(--border-radius-md);
    border: 0.1rem solid var(--color-black);
  }

  &__total {
    color: var(--color-dark);
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-medium);
  }

  &__qr-hint {
    color: var(--color-muted-purple);
    font-size: var(--font-size-sm);
    margin-top: 0.25rem;
  }

  &__dishes-section {
    padding: 1rem;
    margin: 0 1rem 1rem;
    background-color: var(--color-white);
    border-radius: var(--border-radius-sm);
  }

  &__dishes-title {
    margin-bottom: 0.75rem;
    color: var(--color-dark);
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-medium);
  }

  &__dish-form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__dish-inputs {
    display: flex;
    gap: 0.5rem;
  }

  &__dish-input {
    flex: 1;
    min-width: 0;
    width: 100%;
    min-height: 2.5rem;
    padding: 0.75rem 1rem;
    border: 0.1rem solid var(--color-secondary);
    border-radius: var(--border-radius-lg);
    font-size: var(--font-size-sm);
    color: var(--color-dark);

    &::placeholder {
      color: var(--color-muted-purple);
    }

    &:focus {
      outline: none;
      border-color: var(--color-primary);
    }
  }

  &__dish-submit {
    min-height: 2rem;
    padding: 0.8rem 1.5rem;
  }

  &__dish-form-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 0.5rem;
    gap: 0.5rem;
  }

  &__dish-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__dish-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.75rem 0;
    list-style: none;
    border-bottom: 0.1rem solid var(--color-secondary);

    &:last-child {
      border-bottom: none;
    }
  }

  &__dish-name {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 0;
  }

  &__dish-name-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--color-dark);
    font-size: var(--font-size-sm);
  }

  &__dish-price {
    flex-shrink: 0;
    margin-left: 0.5rem;
    color: var(--color-muted-purple);
    font-size: var(--font-size-sm);
  }

  &__dish-actions {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    flex-shrink: 0;

    svg {
      width: 1.25rem;
      height: 1.25rem;
    }
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 1rem;
    overflow: hidden;
    background-color: var(--color-white);
    border-radius: var(--border-radius-sm);
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.75rem 1rem;
    border-bottom: 0.1rem solid var(--color-secondary);
  }

  &__info {
    display: flex;
    flex-direction: column;
    min-width: 0;
    padding: 0.5rem;
  }

  &__participant-name {
    color: var(--color-dark);
  }

  &__dishes {
    color: var(--color-muted-purple);
    font-size: var(--font-size-sm);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__participant-total {
    flex-shrink: 0;
    color: var(--color-dark);
    font-weight: var(--font-weight-medium);
  }

  &__footer {
    background-color: var(--color-white);
    margin-top: auto;
    padding: 1rem;
  }

  &__finish-button {
    width: 100%;
    min-height: 3.5rem;
    border-radius: var(--border-radius-lg);
    color: var(--color-dark-red);
    background-color: var(--color-light-pink);
  }
}
</style>
