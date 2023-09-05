<script setup lang="ts">
const props = defineProps<{
	class?: string;
	variant?: string;
	reverse?: boolean;
}>();
</script>

<template>
	<button
		:class="[
			props.variant === 'primary'
				? props.reverse
					? 'bg-light-primary dark:bg-dark-primary hover:bg-transparent dark:hover:bg-transparent'
					: 'hover:bg-light-primary dark:hover:bg-dark-primary'
				: props.variant === 'secondary'
				? props.reverse
					? 'bg-light-secondary dark:bg-dark-secondary hover:bg-transparent dark:hover:bg-transparent'
					: 'hover:bg-light-secondary dark:hover:bg-dark-secondary'
				: props.variant === 'tertiary'
				? props.reverse
					? 'bg-light-tertiary dark:bg-dark-tertiary hover:bg-transparent dark:hover:bg-transparent'
					: 'hover:bg-light-tertiary dark:hover:bg-dark-tertiary'
				: '',
			'group flex justify-center items-center text-align outline-none rounded-full focus:outline-none transition-all duration-500',
			props.class,
		]"
	>
		<slot></slot>
	</button>
</template>
