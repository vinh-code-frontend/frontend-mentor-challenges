<script setup lang="ts">
import type { ITheme } from '@/stores/theme';

const props = defineProps<{
  theme: ITheme;
}>();

const emit = defineEmits<{
  updateTheme: [theme: ITheme];
}>();

const switchOptions: ITheme[] = [
  {
    id: 1,
    value: 'dark'
  },
  {
    id: 2,
    value: 'light'
  },
  {
    id: 3,
    value: 'contrast'
  }
];

const updateCurrentOption = (option: ITheme) => {
  emit('updateTheme', option);
};
</script>

<template>
  <div class="switch">
    <h5>THEME</h5>
    <div class="switch-box">
      <div v-for="option in switchOptions" :key="option.id" class="switch-option" @click="updateCurrentOption(option)">
        <p>{{ option.id }}</p>
      </div>
      <div class="switch-dot" :class="`position-${props.theme.id}`"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.switch {
  display: flex;
  align-items: center;
  gap: 24px;

  h5 {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 1px;
    color: var(--key-text);
  }
}

.switch-box {
  display: flex;
  position: relative;
}

.switch-option {
  width: 24px;
  aspect-ratio: 1/1;
  background-color: var(--pad-bg);
  cursor: pointer;
  position: relative;

  &:nth-child(1) {
    border-top-left-radius: 50%;
    border-bottom-left-radius: 50%;
  }

  &:nth-child(3) {
    border-top-right-radius: 50%;
    border-bottom-right-radius: 50%;
  }

  & > p {
    position: absolute;
    font-size: 11px;
    top: -14px;
    left: 8px;
    color: var(--key-text);
  }
}

.switch-dot {
  width: 16px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-color: var(--key-result-bg);
  position: absolute;
  top: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--key-result-bg-hover);
  }

  &.position-1 {
    left: 4px;
  }

  &.position-2 {
    left: 28px;
  }

  &.position-3 {
    left: 52px;
  }
}
</style>
