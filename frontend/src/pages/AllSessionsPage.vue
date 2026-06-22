<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from '@/shared/api/instance';
import { useToast } from 'vue-toastification';
import {
  IconChevronLeft,
  IconTrashFilled,
  IconCreditCardHand,
} from '@tabler/icons-vue';
import BaseButton from '@/shared/ui/BaseButton.vue';
import router from '@/app/router';

const sessions = ref([]);
const toast = useToast();

function goBack() {
  router.push('/create');
}

async function getSessions() {
  try {
    const { data } = await api.get('/sessions');
    sessions.value = data;
  } catch (e) {
    toast.error(e instanceof Error ? e.message : 'Не удалось загрузить сессии');
  }
}

async function deleteSession(id: string) {
  try {
    await api.delete(`/sessions/${id}`);
    sessions.value = sessions.value.filter((item) => item.id !== id);
  } catch (e) {
    toast.error(e instanceof Error ? e.message : 'Не удалось удалить сессию');
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString('ru-RU', {
    timeZone: 'Asia/Bishkek',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

onMounted(() => {
  getSessions();
});
</script>

<template>
  <div class="all-sessions">
    <BaseButton
      variant="icon"
      @click="goBack()"
      class="all-sessions__button all-sessions__button--go-back"
    >
      <IconChevronLeft />
    </BaseButton>

    <ul class="all-sessions__list">
      <li
        class="all-sessions__item"
        v-for="session in sessions"
        :key="session.id"
      >
        <div class="all-sessions__info">
          <p class="all-sessions__name">
            {{ formatDate(session.createdAt) }}
          </p>
        </div>

        <BaseButton variant="secondary">
          <IconCreditCardHand />
        </BaseButton>
        <BaseButton variant="danger" @click="deleteSession(session.id)">
          <IconTrashFilled />
        </BaseButton>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.all-sessions {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  max-width: 36rem;
  margin: 0 auto;
  padding: 1rem 1rem 0;

  &__list {
    list-style: none;
    padding: 0;
    margin: 1rem 0;
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
    flex: 1;
    min-width: 0;
    max-width: 26rem;
    display: flex;
    flex-direction: column;
    color: var(--color-dark);
    cursor: pointer;
  }

  &__button {
    flex-shrink: 0;

    &--go-back {
      flex: 1;
      max-width: 3rem;
      padding: 0.5rem;
      margin: 0.4rem;
      border-radius: var(--border-radius-md);
      height: 2.8rem;
    }
  }
}
</style>
