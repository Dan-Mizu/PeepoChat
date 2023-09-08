// app router
import router from "src/router";

// vue
import { createApp } from "vue";

// plugins
import vClickOutside from "click-outside-vue3";
import Popper from "vue3-popper";
import Toast, { PluginOptions } from "vue-toastification";

// css
import "./assets/site/style/main.css";
import "vue-toastification/dist/index.css";

// main app component
import App from "src/App.vue";

// create pinia instance
import { createPinia } from "pinia";
export const pinia = createPinia();

// create app instance
export const app = createApp(App)
	.use(router)
	.use(pinia)
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
