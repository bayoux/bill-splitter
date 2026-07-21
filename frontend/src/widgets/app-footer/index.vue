<script setup lang="ts">
import { useRoute } from 'vue-router';
import router from '@/app/router';
import { IconList, IconPlus } from '@tabler/icons-vue';
import BaseButton from '@/shared/ui/BaseButton.vue';
import { computed } from 'vue';

defineOptions({ name: 'AppFooter' });

const route = useRoute();
const isGuest = computed(() => localStorage.getItem('isGuest') === 'true');
</script>

<template>
  <footer v-if="!isGuest" class="footer">
    <BaseButton
      v-if="route.path !== '/dashboard'"
      variant="secondary"
      class="footer__button"
      @click="router.push('/dashboard')"
    >
      <IconList />
      Список сессий
    </BaseButton>

    <BaseButton
      v-if="route.path !== '/sessions/new'"
      variant="primary"
      class="footer__button"
      @click="router.push('/sessions/new')"
    >
      <IconPlus />
      Создать сессию
    </BaseButton>
  </footer>
</template>

<style lang="scss">
.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  padding: 1rem;
  background-color: var(--color-white);

  &__button {
    flex-shrink: 0;
    border-radius: var(--border-radius-md);
    min-width: 30rem;
    min-height: 3.5rem;
  }
}
</style>
