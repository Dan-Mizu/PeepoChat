<script setup lang="ts">
const props = defineProps<{
	id: string;
	name: string;
	source?: EmoteSource;
}>();

// only one popover (tooltip or menu) is visible at a time app-wide
const { isBlocked, onMouseEnter, onMouseLeave, openDelay } =
	useExclusiveTooltip();
</script>

<template>
	<UTooltip
		:openDelay="openDelay"
		:prevent="isBlocked"
		@mouseenter="onMouseEnter"
		@mouseleave="onMouseLeave"
		:popper="{ placement: 'right' }"
		:ui="{
			width: 'max-w-xs',
			// inline, participates in text flow, but with no extra line-height slack
			base: 'h-fit',
		}"
	>
		<!-- Emote image (plain <img>: emotes are pre-sized CDN assets, so we skip
		     @nuxt/image's IPX proxy which rejects external hosts and breaks animation) -->
		<img
			:src="getEmoteUrl(props.id, props.source)"
			class="inline max-h-8"
			:alt="props.name"
			loading="lazy"
			decoding="async"
		/>

		<!-- Tooltip content (matches EmoteStack's layout so single and stacked
		     emote tooltips render the preview at the same size) -->
		<template #text>
			<div class="flex flex-col items-center justify-center gap-y-3 p-2">
				<div class="flex flex-col items-center gap-y-1">
					<!-- Fixed height (h-16) keeps every preview the same height —
					     square and wide emotes alike — and reserves the space before
					     the 4x image loads so the tooltip opens at its final size. -->
					<img
						:src="getEmoteUrl(props.id, props.source, '4')"
						class="h-16 w-auto"
						:alt="props.name"
					/>
					<span class="text-balance text-xs">{{ props.name }}</span>
				</div>
			</div>
		</template>
	</UTooltip>
</template>
