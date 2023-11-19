import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';

(async () => {
  const { data } = await axios.get('/locales');
  const settings = await axios.get('/settings.json');

  const i18n = createI18n({
    legacy: false,
    locale: settings.data.locale, // set locale
    fallbackLocale: 'en', // set fallback locale
    messages: data, // set locale messages
  });

  createApp(App)
    .use(store)
    .use(router)
    .use(i18n)
    .mount('#app');
})();
