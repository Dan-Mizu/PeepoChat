<script setup lang="ts">
const props = defineProps<{
	time?: string;
}>();

const transitionTime = props.time ? props.time : "0.2s";
</script>

<template>
	<Transition name="fade" mode="out-in">
		<slot></slot>
	</Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity v-bind(transitionTime) ease-in;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
