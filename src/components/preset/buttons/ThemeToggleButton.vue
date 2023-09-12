<script setup lang="ts">
// localization
const localize = useI18n().t;

// theme
const colorMode = useColorMode();

// local dark mode value
const isDark = ref(colorMode.value === "dark");
const toggleDark = () => {
	// toggle local dark mode value
	isDark.value = !isDark.value;

	// change global colormode preference
	colorMode.preference = isDark.value ? "dark" : "light";
};
</script>

<template>
	<ToggleIconButton
		:label="localize('sidebar.theme_toggle_button')"
		:toggleCallback="toggleDark"
		:icon="
			isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'
		"
	/>
</template>
