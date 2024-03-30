<script setup lang="ts">
// localization
const localize = useI18n().t;

// get state
import useStore from "~/stores";
const store = useStore();

// toggle sidebar
const toggleSidebar = () => {
	store.settings.showSidebar = !store.settings.showSidebar;
};
</script>

<template>
	<transition name="slide">
		<ToggleIconButton
			:label="localize('sidebar.toggle_button')"
			:toggleCallback="toggleSidebar"
			:icon="
				store.settings.showSidebar
					? 'i-tabler-chevrons-left'
					: 'i-tabler-chevrons-right'
			"
			backgroundType="secondary"
		/>
	</transition>
</template>

<style>
.slide-enter-active {
	transition: transform 0.2s ease;
}
.slide-leave-active {
	transition: transform 0.2s ease;
}

.slide-enter {
	transform: translateX(100%);
	transition: all 150ms ease-in 0s;
}
.slide-leave-to {
	transform: translateX(-100%);
	transition: all 150ms ease-in 0s;
}
</style>
