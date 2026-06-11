<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import BaseButton from '@/components/BaseButton.vue';
import { IconReload } from '@tabler/icons-vue';
import { useQrCodeStore } from '@/stores/useQrCodeStore';
import { useRoute } from 'vue-router';
import { useSession } from '@/composables/useSession';
import { useParticipant } from '@/composables/useParticipant';

const route = useRoute();
const name = ref('');
const sessionId = route.params.sessionId as string;
const { dishes, participants, loading, getSession } = useSession(sessionId);
const { isJoined, join, selectDish } = useParticipant(sessionId);
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

async function handleJoin() {
  await join(name.value);
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
  await getSession();
});
</script>

<template>
  <div class="guest-page">
    <div v-if="!isJoined">
      <input v-model="name" />
      <BaseButton variant="primary" @click="handleJoin()">
        Присоединиться
      </BaseButton>
    </div>

    <div v-else>
      <div class="guest-page__qr">
        <img
          v-if="qrStore.qrSrc"
          class="guest-page__qr-img"
          :src="qrStore.qrSrc"
          alt="QR"
        />
        <div class="guest-page__total">
          <h2 class="guest-page__total-value">{{ total }} сом</h2>
        </div>
      </div>

      <p v-if="loading">Загрузка...</p>

      <ul v-else class="guest-page__list">
        <li class="guest-page__item" v-for="dish in dishes" :key="dish.id">
          <input
            :checked="currentParticipant?.selections.includes(dish.id)"
            @change="
              (e) =>
                handleSelectDish(
                  dish.id,
                  (e.target as HTMLInputElement).checked,
                )
            "
            class="guest-page__checkbox"
            type="checkbox"
          />
          <div class="guest-page__info">
            <p class="guest-page__name">{{ dish.name }}</p>
            <p class="guest-page__price">{{ dish.price }} сом</p>
          </div>
        </li>
      </ul>

      <BaseButton variant="secondary" @click="getSession()">
        <IconReload stroke="{2}" />
        Обновить список
      </BaseButton>
    </div>
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
}
</style>
