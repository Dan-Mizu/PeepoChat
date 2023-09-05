import router from "src/router";
import "./assets/site/style/main.css";
import { createPinia } from "pinia";
import { createApp } from "vue";
import vClickOutside from "click-outside-vue3";
import Popper from "vue3-popper";
import Toast, { PluginOptions } from "vue-toastification";
import "vue-toastification/dist/index.css";

import App from "src/App.vue";

const pinia = createPinia();

createApp(App)
	.use(pinia)
	.use(router)
	.use(vClickOutside)
	.use(Toast, {
		shareAppContext: true,
		transition: "Vue-Toastification__slideBlurred",
		maxToasts: 20,
		newestOnTop: true,
		filterBeforeCreate: (toast, toasts) => {
			if (toasts.filter((t) => t.type === toast.type).length !== 0) {
				// Returning false discards the toast
				return false;
			}
			// You can modify the toast if you want
			return toast;
		},
	} as PluginOptions)
	.component("Popper", Popper)
	.mount("#app");
