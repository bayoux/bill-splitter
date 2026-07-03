<script setup lang="ts">
defineOptions({ name: 'ConfirmModal' });
import BaseButton from '@/shared/ui/BaseButton.vue';

defineProps<{
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
}>();

const emit = defineEmits<{
  confirm: [];
  cancel: [];
}>();
</script>

<template>
  <div class="confirm-modal-overlay" @click.self="emit('cancel')">
    <div class="confirm-modal">
      <h3 class="confirm-modal__title">{{ title }}</h3>
      <p v-if="description" class="confirm-modal__description">
        {{ description }}
      </p>

      <div class="confirm-modal__actions">
        <BaseButton variant="secondary" @click="emit('cancel')">
          {{ cancelText ?? 'Отмена' }}
        </BaseButton>
        <BaseButton variant="primary" @click="emit('confirm')">
          {{ confirmText ?? 'Подтвердить' }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.confirm-modal-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
  padding: 1rem;
}

.confirm-modal {
  width: 100%;
  max-width: 24rem;
  padding: 1.5rem;
  border-radius: var(--border-radius-md);
  background-color: var(--color-white);
  border: 0.1rem solid var(--color-light-purple-gray);

  &__title {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-heading), serif;
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-regular);
    color: var(--color-dark);
    margin: 0 0 0.5rem;
  }

  &__description {
    text-align: center;
    font-size: var(--font-size);
    color: var(--color-muted-purple);
    margin: 0 0 1.5rem;
  }

  &__actions {
    display: flex;
    gap: 0.75rem;

    button {
      flex: 1;
      min-height: 3rem;
      border-radius: var(--border-radius-md);
    }
  }
}
</style>
