import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';

import App from './App.vue';
import router from './router';
import i18Messages from './i18n.json';

import './assets/main.css';

const getCurrentLanguage = (): string => {
  const locale = navigator.language.split('-')[0];
  return locale === 'fr' ? locale : 'en';
};

const i18n = createI18n({
  locale: getCurrentLanguage(),
  fallbackLocale: 'en',
  messages: i18Messages,
  legacy: false
});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);

app.mount('#app');

export default i18n;
