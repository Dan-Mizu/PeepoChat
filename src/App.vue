<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import FadeTransition from "src/components/ui/transitions/FadeTransition.vue";

import useStore from "src/store/store";
const store = useStore();

import { channel } from "./utils";

// update localStorage with state changes
store.$subscribe((_mutation, state) => {
	localStorage.setItem("chat", JSON.stringify(state));
});

// here we load the data from the server.
onMounted(async () => {
	// start in loading view
	store.activeView.type = "loading";

	// get channel data for saved channels
	try {
		await channel.updateAllData();
	} catch (e) {}

	// artificial delay
	const delay = (ms: number) =>
		new Promise((resolve) => setTimeout(resolve, ms));
	await delay(800);

	// go to chat view
	store.activeView.type = "chat";
});

// add events when the component mounts.
onMounted(async () => {
	window.addEventListener("resize", resizeWindow);
	window.addEventListener("contextmenu", preventContextMenu);
	window
		.matchMedia("(prefers-color-scheme: dark)")
		.addEventListener("change", updateDarkMode);
});

// remove events when un-mounting the component.
onUnmounted(() => {
	window.removeEventListener("resize", resizeWindow);
	window.removeEventListener("contextmenu", preventContextMenu);
	window
		.matchMedia("(prefers-color-scheme: dark)")
		.removeEventListener("change", updateDarkMode);
});

// the app height
const height = ref(`${window.innerHeight}px`);

// change the app height to the window hight.
const resizeWindow = () => {
	height.value = `${window.innerHeight}px`;
};

// prevent right-click context menu
const preventContextMenu = (event: MouseEvent) => {
	event.preventDefault();
};

// update dark mode setting
const updateDarkMode = (event: MediaQueryListEvent) => {
	store.settings.darkMode = event.matches ? true : false;
};
</script>

<template>
	<div :class="{ dark: store.settings.darkMode }">
		<div
			class="bg-light-secondary dark:bg-dark-secondary transition-colors duration-500"
			:style="{ height: height }"
		>
			<router-view v-slot="{ Component }">
				<FadeTransition>
					<component :is="Component" />
				</FadeTransition>
			</router-view>
		</div>
	</div>
</template>
