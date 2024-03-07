<script setup lang="ts">
// localization
const localize = useI18n().t;

// add events when the component mounts.
onMounted(async () => {
	// run client-side only
	if (process.browser) {
		window.addEventListener("contextmenu", preventContextMenu);
	}

	// set default title
	useHead({
		title: localize("title")
	})
});

// remove events when un-mounting the component.
onUnmounted(() => {
	// run client-side only
	if (process.browser) {
		window.removeEventListener("contextmenu", preventContextMenu);
	}
});

// prevent right-click context menu
const preventContextMenu = (event: MouseEvent) => {
	event.preventDefault();
};
</script>

<template>
	<!-- full height div -->
	<div class="h-screen">
		<NuxtPage />
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
