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
			'w-full px-4 py-3 flex items-center border-b outline-none text-sm border-light-secondary dark:border-dark-secondary transition-all duration-500',
			props.color === 'danger'
				? 'text-red-500 dark:hover:text-red-50 hover:bg-red-50 dark:hover:bg-red-900'
				: 'text-light-text hover:bg-light-primary focus:bg-light-primary dark:text-dark-text dark:hover:bg-dark-primary dark:focus:bg-dark-primary ',
		]"
		role="menuitem"
	>
		<slot></slot>
	</button>
</template>
