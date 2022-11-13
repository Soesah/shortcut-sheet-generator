import { computed, ref } from 'vue';
import { i18n, I18NData, I18NLanguage } from '@/core/i18n';

export const useI18n = (lang: I18NLanguage = I18NLanguage.nl) => {
  const language = ref<I18NLanguage>(lang);

  const i18nData = computed((): I18NData => {
    return i18n[language.value];
  });

  const setLanguage = (lang: I18NLanguage) => {
    language.value = lang;
  };

  return { language, i18nData, setLanguage };
};
