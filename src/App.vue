<script setup lang="ts">
// get state
import useStore from "~/store/store";
const store = useStore();

// store state in local storage on every update
store.$subscribe((_mutation, state) => {
	localStorage.setItem("chat", JSON.stringify(state));
});

// add events when the component mounts.
onMounted(async () => {
	// run client-side only
	if (process.browser) {
		window.addEventListener("resize", resizeWindow);
		window.addEventListener("contextmenu", preventContextMenu);
	}
});

// remove events when un-mounting the component.
onUnmounted(() => {
	// run client-side only
	if (process.browser) {
		window.removeEventListener("resize", resizeWindow);
		window.removeEventListener("contextmenu", preventContextMenu);
	}
});

// reference to window height
const height = ref(`${window.innerHeight}px`);

// update height reference
const resizeWindow = () => {
	height.value = `${window.innerHeight}px`;
};

// prevent right-click context menu
const preventContextMenu = (event: MouseEvent) => {
	event.preventDefault();
};
</script>

<template>
	<!-- full height div -->
	<div :style="{ height: height }">
		<NuxtLayout />
	</div>
</template>

<style>
/* debug */
/* * {
	@apply outline outline-1 outline-red-500;
} */

/* all elements should transition colors at 500ms */
* {
	@apply transition-colors duration-500;
}

/* default background colors */
:root {
	@apply bg-light-primary text-light-text placeholder:text-light-text-placeholder;
}
.dark {
	@apply bg-dark-primary text-dark-text placeholder:text-dark-text-placeholder;
}

/* hidden scrollbar */
.scrollbar-hidden::-webkit-scrollbar {
	@apply hidden;
}

.scrollbar-hidden {
	-ms-overflow-style: none;
	scrollbar-width: none;
}
</style>
