<script setup lang="ts">
import { ref, toRefs, watch } from 'vue';
import type { IFlipCardProps } from '../utils/model';
import { vToggle } from '../utils/directive';

const props = defineProps<IFlipCardProps>();

const { data, label } = toRefs<IFlipCardProps>(props);
const data1 = ref<number>(props.data);
const isToggle = ref<boolean>(false);
const prev = ref<number>(props.data);

const endAnimation = (): void => {
  prev.value = data1.value;
  isToggle.value = false;
};

watch(
  () => data.value,
  () => {
    isToggle.value = true;
    data1.value = data.value;
  }
);
</script>

<template>
  <div class="card__wrapper">
    <div class="card">
      <div class="card__top">
        <p class="digit">{{ data1 }}</p>
      </div>
      <div class="card__bottom">
        <p class="digit">{{ prev }}</p>
      </div>
      <div class="overlay">
        <div class="overlay__holder">
          <div
            v-toggle="{ isToggle, customClass: 'flip' }"
            class="overlay__card card__top"
            @animationend="endAnimation"
          >
            <p class="digit">{{ prev }}</p>
          </div>
          <div v-toggle="{ isToggle, customClass: 'flip' }" class="overlay__card card__bottom">
            <p class="digit">{{ data1 }}</p>
          </div>
          <div class="line"></div>
        </div>
      </div>
    </div>
    <label>{{ label }}</label>
  </div>
</template>

<style scoped lang="scss" src="../assets/scss/flipCard.scss"></style>
