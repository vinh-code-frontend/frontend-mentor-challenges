import '@/assets/scss/main.scss';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { useThemeStore } from './stores/theme';

const app = createApp(App);
app.use(createPinia());

const store = useThemeStore();
store.initTheme();

app.mount('#app');
