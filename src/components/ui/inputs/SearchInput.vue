<script setup lang="ts">
import type { Ref } from "vue";

import { ref } from "vue";

import { IconSearch, IconCircleX } from "@tabler/icons-vue";
import IconButton from "src/components/ui/inputs/IconButton.vue";

const props = defineProps<{
	variant?: string;
	class?: string;
}>();

const input: Ref<HTMLInputElement | null> = ref(null);
</script>

<template>
	<div class="relative">
		<i class="absolute left-0 top-[10.5px] ml-3 text-center">
			<IconSearch
				class="w-5 h-5 stroke-2 text-light-text-placeholder dark:text-dark-text-placeholder"
			/>
		</i>
		<input
			ref="input"
			type="text"
			placeholder="Search.."
			:class="`${
				props.variant === 'outline'
					? 'bg-transparent border-light-primary dark:border-dark-primary'
					: 'border-none bg-light-primary dark:bg-dark-primary focus:bg-light-primary dark:focus:bg-dark-primary'
			}, ${props.class}`"
			class="w-full h-8 py-3 px-7 border outline-none rounded-sm text-light-text dark:text-dark-text placeholder:text-light-text-placeholder dark:placeholder:text-dark-text-placeholder duration-500 transition-all"
			@input="$event => {
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      }
      "
		/>
		<div class="absolute top-0 right-0">
			<slot name="endAdornment">
				<IconButton
					v-if="input && input.value"
					@click="
						(_$event) => {
							if (input) input.value = '';
							$emit('update:modelValue', '');
						}
					"
					title="clear text"
					aria-label="clear text"
					class="m-[8px] p-2"
				>
					<IconCircleX
						class="w-5 h-5 text-light-text dark:text-dark-text hover:text-light-accent dark:hover:text-dark-accent"
					/>
				</IconButton>
			</slot>
		</div>
	</div>
</template>
