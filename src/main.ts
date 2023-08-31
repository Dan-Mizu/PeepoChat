import router from "src/router";
import "./assets/site/style/main.css";
import { createPinia } from "pinia";
import { createApp } from "vue";
import vClickOutside from "click-outside-vue3";
import Popper from "vue3-popper";

import App from "src/App.vue";

const pinia = createPinia();

createApp(App).use(pinia).use(router).use(vClickOutside).component("Popper", Popper).mount("#app");
