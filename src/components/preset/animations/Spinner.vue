<script setup lang="ts">
const props = defineProps<{
	class?: string;
}>();
</script>

<template>
	<Icon
		name="svg-spinners:ring-resize"
		:class="[
			props.class,
			'w-8 h-8 text-light-accent dark:text-dark-accent',
		]"
		aria-hidden="true"
		viewBox="0 0 100 101"
		fill="none"
	></Icon>
</template>
