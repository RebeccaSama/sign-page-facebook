import { createI18n } from 'vue-i18n'
import messages from './locales'

// function getCurrentLanguage() {};


const getCurrentLanguage = () => {
  const locale = navigator.language.split('-')[0];
  return locale === 'fr' ? locale : 'en';
};


const i18n = createI18n({
  locale: getCurrentLanguage(),
  fallbackLocale: 'en',
  messages,
  legacy: false
})

export default i18n
