<script setup lang="ts">
const props = defineProps<{
	stack: IEmoteStack[];
}>();

// the first emote defines the slot's width/height (kept in normal flow);
// every following emote is a 0-width overlay centered on top of it
const base = computed(() => props.stack[0]);
const overlays = computed(() => props.stack.slice(1));

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
			base: 'h-fit',
		}"
	>
		<!-- Wrapper participates in text flow. The base defines the width; overlays
		     are absolutely positioned so wide 0-width emotes spill over symmetrically
		     (overflow visible) without pushing the surrounding text. -->
		<span
			class="relative inline-block align-bottom leading-none"
			style="overflow: visible"
		>
			<!-- Base: rendered normally to define container size -->
			<img
				v-if="base"
				:src="getEmoteUrl(base.id, base.source)"
				class="block max-h-8 emote-layer relative"
				:alt="base.name"
				loading="lazy"
				decoding="async"
			/>

			<!-- Overlays: absolutely centered over the base, stacked above it -->
			<img
				v-for="(emote, stackIndex) in overlays"
				:key="`overlay-${stackIndex}-${emote.id}`"
				:src="getEmoteUrl(emote.id, emote.source)"
				class="absolute top-1/2 left-1/2 emote-overlay-layer max-h-8 w-auto"
				style="transform: translate(-50%, -50%)"
				:alt="emote.name"
				loading="lazy"
				decoding="async"
			/>
		</span>

		<!-- Tooltip: list the base and every overlaid emote, like Chatterino -->
		<template #text>
			<div class="flex flex-col items-center justify-center gap-y-3 p-2">
				<div
					v-for="(emote, tipIndex) in stack"
					:key="`tip-${tipIndex}-${emote.id}`"
					class="flex flex-col items-center gap-y-1"
				>
					<!-- Fixed height (h-16) keeps every preview the same height —
					     square and wide emotes alike — and reserves the space before
					     the 4x image loads so the tooltip opens at its final size. -->
					<img
						:src="getEmoteUrl(emote.id, emote.source, '4')"
						class="h-16 w-auto"
						:alt="emote.name"
					/>
					<span class="text-balance text-xs">{{ emote.name }}</span>
				</div>
			</div>
		</template>
	</UTooltip>
</template>
