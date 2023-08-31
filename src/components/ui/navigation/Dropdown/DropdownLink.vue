<script setup lang="ts">
const props = defineProps<{
	handleClick?: () => void;
	label?: string;
	color?: string;
}>();
</script>

<template>
	<button
		:aria-label="props.label"
		@click.prevent="props.handleClick"
		:class="[
			'w-full px-4 py-3 flex items-center border-b opacity-60 dark:opacity-70 outline-none text-sm border-gray-200 dark:border-gray-600 transition-all duration-500',
			props.color === 'danger'
				? 'text-red-500 dark:hover:text-red-50 hover:bg-red-50 active:bg-red-100 dark:hover:bg-red-900'
				: 'text-black dark:text-white active:bg-gray-100 dark:hover:bg-gray-600 dark:focus:bg-gray-600 hover:bg-gray-50',
		]"
		role="menuitem"
	>
		<slot></slot>
	</button>
</template>
