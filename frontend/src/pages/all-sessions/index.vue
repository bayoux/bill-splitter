<script setup lang="ts">
import AppHeader from '@/widgets/app-header/index.vue';

defineOptions({ name: 'AllSessionsPage' });
import { ref, onMounted } from 'vue';
import { api } from '@/shared/api/instance';
import { useToast } from 'vue-toastification';
import {
  IconUsers,
  IconChevronRight,
  IconList,
  IconPlus,
} from '@tabler/icons-vue';
import BaseButton from '@/shared/ui/BaseButton.vue';
import router from '@/app/router';
import type { Session } from '@/types/session';

const sessions = ref<Session[]>([]);
const toast = useToast();

async function getSessions() {
  try {
    const { data } = await api.get('/sessions');
    sessions.value = data;
  } catch (e) {
    toast.error(e instanceof Error ? e.message : 'Не удалось загрузить сессии');
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
  <AppHeader />
  <div class="all-sessions">
    <div class="all-sessions__сontent">
      <div class="all-sessions__main">
        <div class="all-sessions__heading">
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
                <h3>{{ session.name }}</h3>
                <span
                  class="all-sessions__status"
                  :class="{
                    'all-sessions__status--expired': isExpired(
                      session.expiresAt,
                    ),
                    'all-sessions__status--active': !isExpired(
                      session.expiresAt,
                    ),
                  }"
                  >{{
                    isExpired(session.expiresAt) ? 'Завершена' : 'Активна'
                  }}</span
                >
              </div>
              <p class="all-sessions__date">
                {{ formatDate(session.createdAt) }}
              </p>

              <div class="all-sessions__participants-container">
                <div class="all-sessions__participant">
                  <IconUsers />
                  <p>
                    {{ session.participantCount }}
                    {{ getParticipantText(session.participantCount) }}
                  </p>
                </div>

                <BaseButton
                  variant="icon"
                  class="all-sessions__button all-sessions__button--go-forward"
                  @click="router.push(`/sessions/${session.id}/manage`)"
                >
                  <IconChevronRight />
                </BaseButton>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="all-sessions__footer">
        <BaseButton
          variant="secondary"
          class="all-sessions__button all-sessions__button--sessions-list"
        >
          <IconList />
          Список сессий
        </BaseButton>
        <BaseButton
          variant="primary"
          class="all-sessions__button all-sessions__button--session-create"
          @click="router.push('/create')"
        >
          <IconPlus />
          Создать сессию
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.all-sessions {
  display: flex;
  flex-direction: column;
  height: 100dvh;

  &__button {
    flex-shrink: 0;
    border-radius: var(--border-radius-lg);

    &--go-back {
      position: absolute;
      left: 1rem;
      max-width: 3rem;
      height: 2.8rem;
      padding: 0.5rem;
      border: 0.1rem solid var(--color-light-purple-gray);
    }

    &--sessions-list {
      min-width: 16rem;
      min-height: 3.5rem;
    }

    &--session-create {
      min-width: 16rem;
      min-height: 3.5rem;
    }
  }

  &__сontent {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    max-width: 36rem;
    margin: 0 auto;
  }

  &__main {
    padding: 1rem;
  }

  &__heading {
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
    display: flex;
    flex-direction: column;
    color: var(--color-muted-purple);
    cursor: pointer;
  }

  &__participants-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 1rem;
  }

  &__participant {
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 0.6rem;
  }

  &__title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--color-dark);
  }

  &__status {
    padding: 0.25rem 0.5rem;
    border-radius: var(--border-radius-lg);

    &--active {
      background-color: var(--color-light-green);
      color: var(--color-green);
    }

    &--expired {
      background-color: var(--color-light-purple);
      color: var(--color-primary);
    }
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;
    padding: 1rem;
    background-color: var(--color-white);
  }
}
</style>
