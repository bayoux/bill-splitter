<script setup lang="ts">
defineOptions({ name: 'SessionManagePage' });
import { useSession } from '@/entities/session';
import { useRoute } from 'vue-router';

const route = useRoute();
const sessionId = route.params.sessionId as string;
const { sessionName } = useSession(sessionId);
</script>

<template>
  <div class="session-manage-page">
    <div class="session-manage-page__title">
      <h2 class="session-manage-page__name">{{ sessionName }}</h2>
    </div>
  </div>
</template>

<style>
.session-manage-page {
  display: flex;
  min-height: 100dvh;
  flex-direction: column;

  &__name {
    color: var(--color-muted-purple);
    margin: 1rem 1.2rem;
  }
}
</style>
