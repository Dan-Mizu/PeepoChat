<script setup lang="ts">
import type { Ref } from "vue";

import { ref } from "vue";

const props = defineProps<{
	class: any;
	variant?: string;
	value?: string;
	autoResize?: boolean;
}>();

const textarea: Ref<HTMLTextAreaElement | null> = ref(null);

const handleAutoResize = () => {
	if (props.autoResize && textarea.value) {
		textarea.value.style.height = "auto";
		textarea.value.style.height = textarea.value.scrollHeight + "px";
	}
};
</script>

<template>
	<textarea
		:v-bind="props.class"
		maxlength="500"
		class="resize-none max-w-full w-full px-5 py-4 rounded-sm content-center text-sm outline-none placeholder:text-light-text-placeholder dark:placeholder:text-dark-text-placeholder text-light-text dark:text-dark-text bg-light-secondary dark:bg-dark-secondary transition-all duration-500"
		ref="textarea"
		:value="props.value"
		@input="
			($event) => {
				// resize
				handleAutoResize();

				// add text
				$emit('update:modelValue', ($event.target as HTMLInputElement).value);
			}
		"
		@keydown.backspace="handleAutoResize"
		@keydown.enter="
			($event) => {
				// skip if player is holding shift
				if ($event.shiftKey) return

				// clear text area and prevent new line
				($event.target as HTMLInputElement).value = '';
				$event.preventDefault();

				// resize
				handleAutoResize();
					}
		"
	></textarea>
</template>
