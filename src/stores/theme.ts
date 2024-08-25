import { defineStore } from 'pinia';

export type ITheme = {
  id: number;
  value: 'dark' | 'light' | 'contrast';
};

interface IState {
  theme: ITheme;
}

interface IAction {
  initTheme(): void;
  setTheme(theme: ITheme): void;
}

export const useThemeStore = defineStore<'theme', IState, {}, IAction>('theme', {
  state: () => ({
    theme: {
      id: 1,
      value: 'dark'
    }
  }),
  actions: {
    initTheme() {
      const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (userPrefersDark) {
        this.theme = {
          id: 1,
          value: 'dark'
        };
      } else {
        this.theme = {
          id: 2,
          value: 'light'
        };
      }
      document.documentElement.setAttribute('theme', this.theme.value);
    },
    setTheme(theme: ITheme) {
      this.theme = theme;
      document.documentElement.setAttribute('theme', this.theme.value);
    }
  }
});
