<script setup lang="ts">
// localization
const localize = useI18n().t;

// get state
import useStore from "~/store/store";
const store = useStore();

// toggle sidebar
const toggleSidebar = () => {
	store.settings.showSidebar = !store.settings.showSidebar;
};
</script>

<template>
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
</template>
