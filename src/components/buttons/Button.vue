<script setup lang="ts">
import type { ButtonVariant, ButtonSize } from '#ui/types/button';

const props = withDefaults(
	defineProps<{
		to?: string;
		label: string;
		icon?: string;
		text?: string;
		class?: string;
		ui?: any;
		variant?: ButtonVariant;
		size?: ButtonSize;
	}>(),
	{
		variant: 'ghost',
	}
);
const emit = defineEmits(['click']);

// only one popover (tooltip or menu) is visible at a time app-wide
const { isBlocked, onMouseEnter, onMouseLeave, openDelay } =
	useExclusiveTooltip();
</script>

<template>
	<!-- Tooltip wrapper -->
	<UTooltip
		:text="label"
		:openDelay="openDelay"
		:prevent="isBlocked"
		@mouseenter="onMouseEnter"
		@mouseleave="onMouseLeave"
		:popper="{
			placement: 'right',
		}"
	>
		<!-- Button -->
		<UButton
			@click="$emit('click')"
			:to="to"
			:aria-label="label"
			:icon="icon"
			:label="text"
			:class="class"
			:ui="ui"
			:variant="variant"
			:size="size"
		>
			<template #leading>
				<slot name="content" />
			</template>
		</UButton>

		<!-- Custom Tooltip Content -->
		<template #text>
			<slot name="tooltip" />
		</template>
	</UTooltip>
</template>
