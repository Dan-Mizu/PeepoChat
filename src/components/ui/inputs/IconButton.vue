<script setup lang="ts">
const props = defineProps<{
	variant?: string;
}>();
</script>

<template>
	<button
		:class="{
			'hover:bg-light-primary dark:hover:bg-dark-primary focus:bg-light-primary dark:focus:bg-dark-primary':
				props.variant !== 'ghost',
		}"
		class="group flex justify-center items-center outline-none rounded-full focus:outline-none transition-all duration-500"
	>
		<slot></slot>
	</button>
</template>
