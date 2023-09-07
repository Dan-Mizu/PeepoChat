<script setup lang="ts">
defineEmits(["valueChanged"]);

const props = withDefaults(
	defineProps<{
		id?: string;
		type?: string;
		label?: string;
		value?: string;
		placeholder?: string;
		description?: string;
		variant?: string;
		class?: string;
		onSubmit?: (input: string) => void;
		clearOnSubmit?: boolean;
	}>(),
	{
		clearOnSubmit: true,
	}
);
</script>

<template>
	<div>
		<div class="flex justify-start">
			<label v-if="props.label" :for="props.id" class="mb-3">
				<span
					class="w-13 text-sm text-black opacity-60 dark:text-white dark:opacity-70 font-semibold leading-4 tracking-[0.16px]"
				>
					{{ props.label }}
				</span>
			</label>
		</div>

		<div class="relative">
			<input
				@input="
					$emit(
						'valueChanged',
						($event.target as HTMLInputElement).value
					)
				"
				@keydown.enter="
					($event) => {
						// send submit callback
						if (onSubmit) onSubmit(($event.target as HTMLInputElement).value);

						// clear text area
						if (clearOnSubmit) ($event.target as HTMLInputElement).value = '';

						// prevent new line
						$event.preventDefault();
					}
				"
				:type="props.type || 'text'"
				:id="props.id"
				:value="props.value"
				:class="[
					'max-w-full w-full h-8 p-4 rounded-sm content-center placeholder:text-light-text-placeholder dark:placeholder:text-dark-text-placeholder focus:outline-none transition duration-500',
					props.class,
					props.variant === 'bordered'
						? 'border border-gray-200 text-black bg-gray-50 dark:bg-gray-700 dark:text-white dark:bg-opacity-70 dark:focus:bg-opacity-0 focus:bg-opacity-0 focus:border-indigo-300 dark:border-gray-600'
						: 'text-light-text dark:text-dark-text bg-light-secondary dark:bg-dark-secondary border-none',
				]"
				:placeholder="props.placeholder"
			/>

			<div class="absolute top-0 right-0">
				<slot name="endAdornment"></slot>
			</div>
		</div>
	</div>
</template>
