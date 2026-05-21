<script setup lang="ts">
defineProps({
  variant: String,
});
</script>

<template>
  <button :class="['base-btn', `base-btn--${variant}`]">
    <slot />
  </button>
</template>

<style lang="scss">
.base-btn {
  text-align: center;
  font-size: 0.9rem;
  padding: 0.5rem 0.6rem;
  border-radius: var(--border-radius);
  border: 1px solid var(--color-primary);
  color: var(--color-white);
  cursor: pointer;

  /* добавить, загрузить qr, поделиться */
  &--primary {
    background-color: var(--color-primary);
    width: 30%;
    margin-left: auto;
  }

  /* обновить*/
  &--secondary {
    background-color: var(--color-primary);
    margin-bottom: 1.2rem;
  }

  /* удалить */
  &--danger {
    background-color: var(--color-primary);
    width: 30%;
    margin-left: auto;
  }

  /* редактировать и удалить в списке блюд */
  &--icon {
    background-color: var(--color-primary);
    padding: 0.2rem 0.4rem;
  }
}
</style>
