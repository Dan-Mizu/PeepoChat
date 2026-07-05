<script setup lang="ts">
// add events when the component mounts.
onMounted(async () => {
	// run client-side only
	if (process.client) {
		window.addEventListener('contextmenu', preventContextMenu);
	}
});

// remove events when un-mounting the component.
onUnmounted(() => {
	// run client-side only
	if (process.client) {
		window.removeEventListener('contextmenu', preventContextMenu);
	}
});

// prevent right-click context menu (we have our own)
const preventContextMenu = (event: MouseEvent) => event.preventDefault();
</script>

<template>
	<div class="h-screen">
		<NuxtLoadingIndicator />
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>

<style>
/* debug */
/* * {
	@apply outline outline-1 outline-red-500;
} */

/* defaults */
:root {
	@apply bg-primary-color text-color font-sans;
}

/* hidden scrollbars */
.scrollbar-hidden::-webkit-scrollbar {
	@apply hidden;
}

.scrollbar-hidden {
	-ms-overflow-style: none;
	scrollbar-width: none;
}

/* theme */
.bg-primary-color {
	@apply bg-gray-100;
}

.bg-primary-color.dark {
	@apply bg-gray-950;
}

.bg-secondary-color {
	@apply bg-gray-50 dark:bg-gray-900;
}

.bg-secondary-color.dark {
	@apply bg-gray-900;
}

.text-color {
	@apply text-black;
}

.text-color.dark {
	@apply text-white;
}

/* layer priorities */
.overlay-layer {
	@apply z-40;
}
.sidebar-layer {
	@apply z-30;
}
.content-layer {
	@apply z-20;
}
.header-layer {
	@apply z-10;
}
.footer-layer {
	@apply z-10;
}
.emote-overlay-layer {
	z-index: 2;
}
.emote-layer {
	z-index: 1;
}

/* offsets */
.sidebar-offset {
	@apply -ml-10;
}

/* utility */
.full-center {
	@apply justify-center items-center;
}
</style>
