<script setup lang="ts">
// properties
const props = defineProps<{
	title: string;
	url: string;
	previewUrl: string;
}>();

// only one popover (tooltip or menu) is visible at a time app-wide
const { isBlocked, onMouseEnter, onMouseLeave, openDelay } =
	useExclusiveTooltip();
</script>

<template>
	<!-- Hover Tooltip -->
	<UTooltip
		:openDelay="openDelay"
		:prevent="isBlocked"
		@mouseenter="onMouseEnter"
		@mouseleave="onMouseLeave"
		:popper="{ placement: 'right' }"
		:ui="{
			width: 'w-24',
			base: 'h-fit',
		}"
	>
		<!-- Badge -->
		<NuxtImg :src="props.url" class="inline pr-2" />

		<!-- Custom Tooltip Content -->
		<template #text>
			<div
				class="flex flex-col items-center justify-center text-center gap-y-2 p-2"
			>
				<NuxtImg :src="props.previewUrl" />
				<span class="text-balance text-xs">{{ title }}</span>
			</div>
		</template>
	</UTooltip>
</template>
