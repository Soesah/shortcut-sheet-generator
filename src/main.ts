import { createApp } from 'vue';
import SSGApp from './SSGApp.vue';
import { router } from './router';
import { store } from './store';

const app = createApp(SSGApp).use(router).use(store);

app.mount('#app');
