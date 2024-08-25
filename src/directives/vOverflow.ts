import type { Directive, DirectiveBinding } from 'vue';

const isOverflow = (el: HTMLElement) => {
  return el.scrollWidth > el.clientWidth;
};

export const vOverflow: Directive = {
  mounted: (el: HTMLElement, binding: DirectiveBinding) => {
    const _isOverflow = isOverflow(el);
    if (_isOverflow) {
      el.style.overflowX = 'scroll';
    } else {
      el.style.overflowX = 'hidden';
    }
    if (typeof binding.value === 'function') {
      binding.value(_isOverflow);
    }
  },
  updated: (el: HTMLElement, binding: DirectiveBinding) => {
    const _isOverflow = isOverflow(el);
    if (_isOverflow) {
      el.style.overflowX = 'scroll';
    } else {
      el.style.overflowX = 'hidden';
    }
    if (typeof binding.value === 'function') {
      binding.value(_isOverflow);
    }
  }
};
