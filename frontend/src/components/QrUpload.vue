<script setup lang="ts">
import { onMounted } from 'vue';
import BaseButton from '@/components/BaseButton.vue';
import { IconFileUploadFilled } from '@tabler/icons-vue';
import { useQrCodeStore } from '@/stores/qrCode';

const qrStore = useQrCodeStore();

onMounted(async () => {
  await qrStore.getQrCode();
});
</script>

<template>
  <div class="qr-upload">
    <template v-if="!qrStore.qrSrc">
      <div class="qr-upload__qr">
        <IconFileUploadFilled class="qr-upload__icon qr-upload__icon--upload" />
        <div>
          <p class="qr-upload__qr-title">Загрузить QR</p>
          <p class="qr-upload__qr-subtitle">PNG, JPG, JPEG</p>
        </div>
      </div>

      <label class="qr-upload__upload-label" for="qr-upload">Загрузить </label>

      <input
        class="qr-upload__file-input"
        id="qr-upload"
        type="file"
        accept="image/*"
        @change="qrStore.onQrUpload"
        style="display: none"
      />
    </template>

    <template v-else>
      <div class="qr-upload__qr-file">
        <img
          class="qr-upload__qr-image"
          :src="qrStore.qrSrc"
          alt="QR"
          @click="qrStore.showQrCode = true"
        />

        <div
          v-if="qrStore.showQrCode"
          class="qr-upload__qr-overlay"
          @click="qrStore.showQrCode = false"
        >
          <div class="qr-upload__qr-popup" @click.stop>
            <img :src="qrStore.qrSrc" alt="QR" />
          </div>
        </div>

        <div class="qr-upload__qr-info">
          <p class="qr-upload__qr-name">{{ qrStore.fileName }}</p>
          <p class="qr-upload__qr-size">{{ qrStore.fileSize }}</p>
        </div>
      </div>

      <BaseButton
        variant="secondary"
        @click="qrStore.deleteQrCode"
        class="qr-upload__button qr-upload__button--delete"
      >
        Удалить
      </BaseButton>
    </template>
  </div>
</template>

<style lang="scss">
.qr-upload {
  width: 100%;
  max-width: 34rem;
  min-height: 5rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: var(--border-radius-md);
  background-color: var(--color-white);

  &__qr {
    display: flex;
    align-items: center;
  }

  &__icon {
    color: var(--color-icon);
    &--upload {
      width: var(--icon-lg);
      height: var(--icon-lg);
    }
  }

  &__qr-title {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    margin-bottom: 0.3rem;
    color: var(--color-muted-purple);
  }

  &__qr-subtitle {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-regular);
    color: var(--color-muted-purple);
  }

  &__upload-label {
    display: flex;
    justify-content: center;
    padding: 0.7rem 1.5rem;
    max-width: 7rem;
    min-height: 2.5rem;
    margin-left: auto;
    font-weight: var(--font-weight-medium);
    color: var(--color-muted-purple);
    background-color: var(--color-secondary);
    border-radius: var(--border-radius-lg);
    border: 0.1rem solid transparent;

    &:hover {
      border-color: var(--color-primary);
    }
  }

  &__file-input {
    display: none;
  }

  &__qr-file {
    max-width: 34rem;
    min-height: 3.4rem;
    display: flex;
    letter-spacing: 0.01em;
    line-height: 1.7;
    gap: 1rem;
    flex: 1;
  }

  &__qr-image {
    width: 3.5rem;
    height: 3.5rem;
    object-fit: cover;
    border-radius: 0.1rem;
    cursor: pointer;
  }

  &__qr-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  &__qr-popup {
    border-radius: var(--border-radius-lg);
    padding: 1.5rem;

    img {
      max-width: 18rem;
      height: auto;
      object-fit: contain;
      border-radius: var(--border-radius-md);
    }
  }

  &__qr-info {
    color: var(--color-black);
  }

  &__qr-name {
    font-size: var(--font-size);
    font-weight: var(--font-weight-semibold);
    color: var(--color-muted-purple);
  }

  &__qr-size {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    letter-spacing: 0.01rem;
    color: var(--color-muted-purple);
  }

  &__button {
    border-radius: var(--border-radius-lg);
    &--delete {
      width: 100%;
      max-width: 7rem;
      min-height: 2.7rem;
      padding: 0.7rem 1.5rem;
      font-weight: var(--font-weight-medium);
    }
  }

  @media (max-width: 480px) {
    flex-direction: column;
    justify-content: flex-start;
    gap: 1rem;

    &__button--delete {
      margin-left: 0;
      align-self: flex-end;
    }
  }
}
</style>
