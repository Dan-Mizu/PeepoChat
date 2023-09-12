<script setup lang="ts">
// localization
const localize = useI18n().t;

const props = withDefaults(
	defineProps<{
		label?: string;
		icon: string;
		clickCallback: () => void;
		size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
		iconColor?: "theme" | "primary" | "secondary";
		backgroundType?: "primary" | "secondary" | "tertiary";
		roundedType?: "medium" | "full";
	}>(),
	{
		size: "3xl",
		iconColor: "secondary",
		backgroundType: "tertiary",
		roundedType: "medium",
	}
);

// init default button style
let style = {
	rounded: "rounded-md",
	color: {
		// TODO: Fix blur when transition scaling SVGs
		primary: {
			solid: "focus:outline-none hover:scale-105 transition duration-500",
		},
	},
};

// rounded
if (props.roundedType === "full") style.rounded = "rounded-full";

// icon color
if (props.iconColor === "theme")
	style.color.primary.solid += " text-light-text dark:text-dark-text";
else if (props.iconColor === "primary")
	style.color.primary.solid += " text-light-primary dark:text-dark-primary";
else if (props.iconColor === "secondary")
	style.color.primary.solid +=
		" text-light-secondary dark:text-dark-secondary";

// background
if (props.backgroundType === "primary")
	style.color.primary.solid += " bg-light-primary dark:bg-dark-primary";
else if (props.backgroundType === "secondary")
	style.color.primary.solid += " bg-light-secondary dark:bg-dark-secondary";
else if (props.backgroundType === "tertiary")
	style.color.primary.solid += " bg-light-tertiary dark:bg-dark-tertiary";
</script>

<template>
	<ClientOnly>
		<UButton
			:ui="style"
			square
			:aria-label="label ? label : localize('generic.link_button')"
			@click="clickCallback"
			><Icon :name="props.icon" :class="['text-' + props.size]"
		/></UButton>

		<template #fallback>
			<div class="w-8 h-8" />
		</template>
	</ClientOnly>
</template>
