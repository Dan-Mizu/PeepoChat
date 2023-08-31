import { createRouter, createWebHistory } from "vue-router";
import HomeView from "src/components/views/HomeView/HomeView.vue";
import Lang from "src/assets/lang/en_us.json";

const routes = [
	{
		path: "/",
		name: "Home",
		component: HomeView,
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

// set window title
router.beforeEach((_to, _from, next) => {
	document.title = Lang.window.title;
	next();
});

export default router;
