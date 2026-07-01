<script setup lang="ts">
defineOptions({ name: 'GuestPage' });
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { IconReload } from '@tabler/icons-vue';
import JoinForm from '@/widgets/join-form/index.vue';
import { useParticipant } from '@/features/join-session';
import { useQrCodeStore } from '@/entities/qr-code';
import { useSession } from '@/entities/session';
import BaseButton from '@/shared/ui/BaseButton.vue';

const route = useRoute();
const sessionId = route.params.sessionId as string;
const { dishes, participants, loading, getSession } = useSession(sessionId);
const { isJoined, join, clearToken, selectDish } = useParticipant(sessionId);
const participantId = ref(
  localStorage.getItem(`bill_splitter_participantId_${sessionId}`),
);
const currentParticipant = computed(() =>
  participants.value.find(
    (participant) => participant.id === participantId.value,
  ),
);
const qrStore = useQrCodeStore();
const total = computed(() => {
  const selected = dishes.value.filter((dish) =>
    currentParticipant.value?.selections.includes(dish.id),
  );
  return selected.reduce((sum, dish) => sum + Number(dish.price), 0);
});

async function handleJoin(value: string) {
  const ok = await join(value);
  if (!ok) return;

  participantId.value = localStorage.getItem(
    `bill_splitter_participantId_${sessionId}`,
  );
  await getSession();
}

async function handleSelectDish(dishId: number, checked: boolean) {
  await selectDish(dishId, checked);
  await getSession();
}

onMounted(async () => {
  await qrStore.getQrCode();
  const result = await getSession();
  if (result === 'not_found') {
    clearToken();
  }
});
</script>

<template>
  <div class="guest-page">
    <JoinForm v-if="!isJoined" @join="handleJoin" />

    <div v-else class="guest-page__content">
      <div class="guest-page__qr-card">
        <div class="guest-page__qr">
          <img
            v-if="qrStore.qrSrc"
            class="guest-page__qr-img"
            :src="qrStore.qrSrc"
            alt="QR"
          />
          <div class="guest-page__total">
            <h2
              class="guest-page__total-value"
              :style="{ visibility: total > 0 ? 'visible' : 'hidden' }"
            >
              {{ total }} сом
            </h2>
          </div>
        </div>

        <p v-if="loading">Загрузка...</p>

        <ul v-else class="guest-page__list">
          <li v-for="dish in dishes" :key="dish.id" class="guest-page__item">
            <input
              :checked="currentParticipant?.selections.includes(dish.id)"
              class="guest-page__checkbox"
              type="checkbox"
              @change="
                (e) =>
                  handleSelectDish(
                    dish.id,
                    (e.target as HTMLInputElement).checked,
                  )
              "
            />
            <div class="guest-page__info">
              <p class="guest-page__name">
                {{ dish.name }}
              </p>
              <p class="guest-page__price">{{ dish.price }} сом</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="guest-page__footer">
        <BaseButton
          variant="secondary"
          class="guest-page__button guest-page__button--refresh"
          @click="getSession(false)"
        >
          <IconReload stroke="{2}" />
          Обновить список
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.guest-page {
  display: flex;
  min-height: 100dvh;
  flex-direction: column;

  &__content {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  &__qr-card {
    margin: 1rem;
  }

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
    border: 0.1rem solid var(--color-black);
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
    margin: 1rem 0;
    overflow: hidden;
    background-color: var(--color-white);
    border-radius: var(--border-radius-md);
  }

  &__item {
    max-width: 35rem;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.6rem 1rem 0.6rem 1rem;
    border-bottom: 0.1rem solid var(--color-secondary);

    &:last-child {
      border-bottom: none;
    }
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

  &__footer {
    margin-top: auto;
    background-color: var(--color-white);
    padding: 1rem;
  }

  &__button {
    width: 100%;
    min-height: 3.5rem;

    &--refresh {
      max-width: 34rem;
    }
  }
}
</style>
