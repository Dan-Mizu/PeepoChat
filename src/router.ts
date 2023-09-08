import { createRouter, createWebHistory } from "vue-router";

// components
import HomeView from "src/components/views/HomeView/HomeView.vue";

// lang
import Lang from "src/assets/lang/en_us.json";

const router = createRouter({
	// history
	history: createWebHistory(),

	// page routes
	routes: [
		{
			path: "/",
			name: "Home",
			component: HomeView,
		},
	],
});

// set window title
router.beforeEach((_to, _from, next) => {
	document.title = Lang.window.title;
	next();
});

export default router;
