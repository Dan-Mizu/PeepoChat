<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

import ScaleTransition from "src/components/ui/transitions/ScaleTransition.vue";

import useStore from "src/store/store";
const store = useStore();

const props = defineProps<{
	id: string;
	label: string;
	show: boolean;
	class?: string;
	handleClickOutside: any;
	closeDropdown: () => void;
}>();

// (event) close dropdown when typing esc button.
const handleCloseOnEscape = (event: KeyboardEvent) => {
	if (["Escape", "Esc"].includes(event.key)) {
		props.closeDropdown();
	}
};

onMounted(() => {
	// set the handleCloseOnEscape when mounting the component.
	document.addEventListener("keydown", handleCloseOnEscape);
});

onUnmounted(() => {
	// remove handleCloseOnEscape when unmounting the component.
	document.removeEventListener("keydown", handleCloseOnEscape);
});
</script>

<template>
	<VDropdown
		theme="dropdownlist"
		:show-group="props.id"
		:auto-hide="false"
		:shown="show"
	>
		<template #popper>
			<ScaleTransition>
				<div
					v-click-outside="props.handleClickOutside"
					:class="[
						props.class,
						!store.settings.darkMode
							? 'bg-light-secondary text-light-text'
							: 'bg-dark-secondary text-dark-text',
						'w-[200px] rounded-sm shadow-lg transition-all duration-500 focus:outline-none',
					]"
				>
					<slot name="content" />
				</div>
			</ScaleTransition>
		</template>
		<slot />
	</VDropdown>
</template>