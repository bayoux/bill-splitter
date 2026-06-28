<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from '@/shared/api/instance';
import { useToast } from 'vue-toastification';
import {
  IconChevronLeft,
  IconUsers,
  IconChevronRight,
} from '@tabler/icons-vue';
import BaseButton from '@/shared/ui/BaseButton.vue';
import router from '@/app/router';
import type { Session } from '@/types/session';

const sessions = ref<Session[]>([]);
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

function isExpired(expiresAt: string) {
  return new Date() > new Date(expiresAt);
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

    <div class="all-sessions__header">
      <h3>Ваши сессии</h3>
      <p>{{ sessions.length }} всего</p>
    </div>

    <ul class="all-sessions__list">
      <li
        class="all-sessions__item"
        v-for="session in sessions"
        :key="session.id"
      >
        <div class="all-sessions__info">
          <div class="all-sessions__title">
            <h3>название</h3>
            <span class="all-sessions__status">{{
              isExpired(session.expiresAt) ? 'Завершена' : 'Активна'
            }}</span>
          </div>
          <p class="all-sessions__date">
            {{ formatDate(session.createdAt) }}
          </p>

          <div class="all-sessions__participants">
            <div>
              <IconUsers />
              <p>
                {{ session.participantCount }}
                {{ getParticipantText(session.participantCount) }}
              </p>
            </div>

            <BaseButton
              variant="icon"
              class="all-sessions__button all-sessions__button--go-forward"
            >
              <IconChevronRight />
            </BaseButton>
          </div>
        </div>
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

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--color-muted-purple);
    margin-inline: 0.5rem;
  }

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
    max-width: 27rem;
    display: flex;
    flex-direction: column;
    color: var(--color-muted-purple);
    cursor: pointer;
  }

  &__participants {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 1rem;
  }

  &__title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--color-dark);
  }

  &__status {
    padding: 0.25rem 0.5rem;
    background-color: var(--color-light-green);
    color: var(--color-green);
    border-radius: var(--border-radius-lg);
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

    &--go-forward {
    }
  }
}
</style>
