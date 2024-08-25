<script setup lang="ts">
import { computed, ref } from 'vue';
import ThemeSwitcher from './components/ThemeSwitcher.vue';
import { buttons, type IButton } from './data';
import { useThemeStore, type ITheme } from './stores/theme';
import { vOverflow } from './directives/vOverflow';
import { isMissingDecimal, isOnlyZerosAndDots, convertArrStringToNumber, findOperatorIndex, formatNumber } from './utils';

type IQueueItem = Pick<IButton, 'value'> & { type: 'number' | 'operator' };

const themeStore = useThemeStore();
const theme = computed<Readonly<ITheme>>(() => themeStore.theme);

const calculusRef = ref<InstanceType<typeof HTMLElement>>();
const isCalculusOverflow = ref<boolean>(false);
const queueArr = ref<IQueueItem[]>([]);
const valueQueue = computed<Readonly<string[]>>(() => queueArr.value.map((item) => item.value));
const displayQueue = computed<Readonly<string>>(() => valueQueue.value.join(' '));

const result = ref<number>(0);
const formatResult = computed<string>(() => result.value.toLocaleString());

const calculator = (operator: string, leftNumber: number, rightNumber: number): number => {
  switch (operator) {
    case '+':
      return formatNumber(leftNumber + rightNumber);
    case '-':
      return formatNumber(leftNumber - rightNumber);
    case 'x':
      return formatNumber(leftNumber * rightNumber);
    case '/':
      return formatNumber(leftNumber / rightNumber);
    default:
      return 0;
  }
};

const handleCalc = (calcQueue: (number | string)[], operators: string[]): void => {
  while (findOperatorIndex(calcQueue, operators) > -1) {
    const index = findOperatorIndex(calcQueue, operators);

    const operator = calcQueue[index];
    const leftNumber = calcQueue[index - 1] as number;
    const rightNumber = calcQueue[index + 1] as number;

    calcQueue[index] = calculator(operator as string, leftNumber, rightNumber);
    calcQueue.splice(index - 1, 1);
    calcQueue.splice(index, 1);
  }
};

const handleClick = (btn: IButton): void => {
  if (btn.type === 'result') {
    const numberQueue = convertArrStringToNumber(valueQueue.value as string[]);
    handleCalc(numberQueue, ['x', '/']);
    handleCalc(numberQueue, ['+', '-']);

    result.value = numberQueue[0] as number;
    return;
  }
  if (btn.type === 'reset') {
    queueArr.value = [];
    result.value = 0;
    return;
  }
  const lastIndex = queueArr.value.length - 1;

  if (isCalculusOverflow.value) {
    calculusRef.value?.scrollTo({ left: calculusRef.value.scrollWidth });
  }
  if (btn.type === 'delete') {
    if (queueArr.value.length === 0) {
      return;
    }
    if (queueArr.value[lastIndex].type === 'number') {
      if (queueArr.value[lastIndex].value.length > 1) {
        queueArr.value[lastIndex].value = queueArr.value[lastIndex].value.slice(0, -1);
        return;
      }
    }
    queueArr.value.pop();
    return;
  }
  const temp: IQueueItem = {
    type: btn.type,
    value: btn.value
  };
  if (queueArr.value[lastIndex]?.type === btn.type) {
    switch (btn.type) {
      case 'number':
        if (queueArr.value[lastIndex].value === '-' && btn.value === '.') {
          queueArr.value[lastIndex].value = '-0.';
          break;
        }
        if (queueArr.value[lastIndex].value.includes('.') && btn.value === '.') {
          break;
        }
        if (queueArr.value[lastIndex].value.includes('-')) {
          queueArr.value[lastIndex].value += btn.value;
          break;
        }
        if (btn.value === '0' && queueArr.value[lastIndex].value === '0') {
          break;
        }
        queueArr.value[lastIndex].value = queueArr.value[lastIndex].value + btn.value;
        break;
      case 'operator':
        queueArr.value[lastIndex].value = btn.value;
        break;
      default:
        break;
    }
  } else {
    switch (btn.type) {
      case 'number':
        if (btn.value === '.') {
          temp.value = '0.';
        }
        break;
      case 'operator':
        if (queueArr.value.length === 0) {
          if (btn.value !== '-') {
            return;
          }
          temp.type = 'number';
        } else if (queueArr.value.length === 1 && queueArr.value[0].value === '-') {
          return;
        } else if (isOnlyZerosAndDots(queueArr.value[lastIndex].value)) {
          queueArr.value[lastIndex].value = '0';
        } else if (isMissingDecimal(queueArr.value[lastIndex].value)) {
          queueArr.value[lastIndex].value = queueArr.value[lastIndex].value.slice(0, -1);
        }
        break;
      default:
        break;
    }
    queueArr.value.push(temp);
  }
};

const handleOverflow = (isOverflow: boolean): void => {
  isCalculusOverflow.value = isOverflow;
};
</script>

<template>
  <div class="calc">
    <div class="header">
      <p>calc</p>
      <theme-switcher
        :theme="theme"
        @update-theme="
          (theme) => {
            themeStore.setTheme(theme);
          }
        "
      />
    </div>
    <div class="body">
      <div class="screen">
        <div v-overflow="handleOverflow" ref="calculusRef" class="calculus noselect">{{ displayQueue }}</div>
        <div class="result noselect">
          <p v-overflow>{{ formatResult }}</p>
        </div>
      </div>
      <div class="btns">
        <button v-for="btn in buttons" :key="btn.id" :class="`btn btn-${btn.type} noselect`" type="button" @click="handleClick(btn)">
          {{ btn.value }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './assets/scss/app.scss';
</style>
