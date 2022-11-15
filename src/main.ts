import { createApp } from 'vue';
import SSGApp from './SSGApp.vue';
import { router } from './router';
import { store } from './store';
import AutoFocus from './directives/auto-focus';
import ClickOutside from './directives/click-outside';

const app = createApp(SSGApp).use(router).use(store);

app.directive('auto-focus', AutoFocus);
app.directive('click-outside', ClickOutside);

app.mount('#app');
