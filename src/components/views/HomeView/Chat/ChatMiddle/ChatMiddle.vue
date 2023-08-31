<script setup lang="ts">
import type { Ref } from "vue";
import { onMounted, ref } from "vue";

const container: Ref<HTMLElement | null> = ref(null);

// scroll messages to bottom.
onMounted(() => {
	(container.value as HTMLElement).scrollTop = (
		container.value as HTMLElement
	).scrollHeight;
});
</script>

<template>
	<div
		ref="container"
		class="grow px-5 py-5 flex flex-col overflow-y-scroll scrollbar-hidden"
	></div>
</template>
