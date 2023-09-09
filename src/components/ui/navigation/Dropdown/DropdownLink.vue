<script setup lang="ts">
import useStore from "src/store/store";
const store = useStore();

const props = defineProps<{
	handleClick?: () => void;
	label?: string;
}>();
</script>

<template>
	<button
		:aria-label="props.label"
		@click.prevent="props.handleClick"
		:class="[
			!store.settings.darkMode
				? 'border-light-primary hover:bg-light-secondary'
				: 'border-dark-primary hover:bg-dark-secondary',
			'w-full px-4 py-3 flex items-center border-b outline-none text-sm transition-all duration-500',
		]"
		role="menuitem"
	>
		<slot></slot>
	</button>
</template>
