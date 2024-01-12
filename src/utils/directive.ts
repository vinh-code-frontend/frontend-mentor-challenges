import { type Directive, type DirectiveBinding } from 'vue';
import type { MyDirectiveBinding } from './model';

export const vToggle: Directive = {
  beforeMount(_: HTMLElement, binding: DirectiveBinding) {
    if (!binding.value) {
      throw new Error('Callback missing in directive');
    }
  },
  mounted: (
    el: HTMLElement,
    binding: MyDirectiveBinding<{
      isToggle: boolean;
      customClass: string;
    }>
  ) => {
    const { isToggle, customClass } = binding.value;
    if (isToggle) {
      el.classList.add(customClass);
    } else {
      el.classList.remove(customClass);
    }
  },
  updated: (el: HTMLElement, binding: DirectiveBinding) => {
    const { isToggle, customClass } = binding.value;
    if (isToggle) {
      el.classList.add(customClass);
    } else {
      el.classList.remove(customClass);
    }
  },
  unmounted: (el: HTMLElement, binding: DirectiveBinding) => {
    const { customClass } = binding.value;
    el.classList.remove(customClass);
  }
};
