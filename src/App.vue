<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, shallowRef } from 'vue';
import { DAYS_UNIT, HOURS_UNIT, MINUTES_UNIT, INIT_DATA, SVG_ICONS } from './utils/constants';
import { IInitData, IFooterIcon } from './utils/model';
import FlipCard from './components/FlipCard.vue';

const timer = shallowRef<ReturnType<typeof setInterval>>();
const selectedTime = ref<number>(new Date().setDate(new Date().getDate() + 6));

const data = ref<IInitData[]>(INIT_DATA);
const icons = ref<IFooterIcon<'svg'>[]>(SVG_ICONS);

const calcTimeLeft = (selectedTime: number, currentTime: number): number[] => {
  const timeLeft = Math.floor(selectedTime / 1000) - Math.floor(currentTime / 1000);

  const days = Math.floor(timeLeft / DAYS_UNIT);
  const hours = Math.floor((timeLeft - days * DAYS_UNIT) / HOURS_UNIT);
  const minutes = Math.floor((timeLeft - days * DAYS_UNIT - hours * HOURS_UNIT) / MINUTES_UNIT);
  const seconds = Math.floor(
    timeLeft - days * DAYS_UNIT - hours * HOURS_UNIT - minutes * MINUTES_UNIT
  );

  return [days, hours, minutes, seconds];
};

onMounted(() => {
  timer.value = setInterval(() => {
    const timeLeft = calcTimeLeft(selectedTime.value, Date.now());
    data.value[0].value = timeLeft[0];
    for (let i = 0; i < data.value.length; i++) {
      data.value[i].value = timeLeft[i];
    }
    data.value[0].value++;
  }, 1000);
});

onBeforeUnmount(() => {
  clearInterval(timer.value);
});
</script>

<template>
  <div class="app">
    <h3 class="title">WE'RE LAUNCHING SOON</h3>
    <div class="flip__wrap">
      <FlipCard v-for="item in data" :key="item.id" :data="item.value" :label="item.label" />
    </div>
    <div class="icons">
      <a href="." v-for="item in icons" :key="item.id">
        <component :is="item.component" />
      </a>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./assets/scss/app.scss"></style>
