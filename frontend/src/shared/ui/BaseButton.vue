<script setup lang="ts">
defineOptions({ name: 'BaseButton' });
type ButtonVariants =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'icon'
  | 'ghost'
  | 'toast';

withDefaults(defineProps<{ variant?: ButtonVariants }>(), {
  variant: 'primary',
});
</script>

<template>
  <button :class="['base-btn', `base-btn--${variant}`]">
    <slot />
  </button>
</template>

<style lang="scss">
.base-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  font-size: var(--font-size);
  padding: 0.6rem 1rem;
  border-radius: var(--border-radius-md);
  border: 0.1rem solid transparent;
  cursor: pointer;

  &--primary {
    background-color: var(--color-primary);
    color: var(--color-white);

    &:hover {
      border-color: var(--color-dark);
    }
  }

  &--secondary {
    background-color: var(--color-secondary);
    color: var(--color-muted-purple);

    &:hover {
      border-color: var(--color-primary);
    }
  }

  &--danger {
    background-color: var(--color-grey);
    color: var(--color-white);
  }

  &--icon {
    padding: 0.2rem;
    background-color: var(--color-white);
    border: none;
    color: var(--color-muted-dark);
  }

  &--ghost {
    background-color: var(--color-white);
    color: var(--color-primary);
    font-weight: var(--font-weight-medium);

    &:hover {
      border-color: var(--color-primary);
    }
  }

  &--toast {
    background-color: var(--color-toast);
    color: var(--color-black);
    font-weight: var(--font-weight-medium);

    &:hover {
      border-color: var(--color-primary);
    }
  }
}
</style>
