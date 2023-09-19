<script setup lang="ts">
// localization
const localize = useI18n().t;

const props = withDefaults(
	defineProps<{
		label?: string;
		icon: string;
		clickCallback: () => void;
		size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl";
		backgroundType?: "primary" | "secondary";
		roundedType?: "medium" | "full";
	}>(),
	{
		size: "lg",
		backgroundType: "primary",
		roundedType: "full",
	}
);

// init default button style
let style = {
	rounded: "rounded-md",
	color: {
		primary: {
			solid: "text-light-text dark:text-dark-text focus:outline-none",
		},
	},
	square: {
		"2xs": "p-1",
		xs: "p-1",
		sm: "p-1",
		md: "p-2",
		lg: "p-2.5",
		xl: "p-2.5",
	},
	icon: {
		base: "flex-shrink-0",
		size: {
			"2xs": "h-3 w-3",
			xs: "h-4 w-4",
			sm: "h-5 w-5",
			md: "h-6 w-6",
			lg: "h-6 w-6",
			xl: "h-7 w-7",
		},
	},
};

// rounded
if (props.roundedType === "full") style.rounded = "rounded-full";

// background
if (props.backgroundType === "primary")
	style.color.primary.solid +=
		" hover:bg-light-primary dark:hover:bg-dark-primary";
else if (props.backgroundType === "secondary")
	style.color.primary.solid +=
		" hover:bg-light-secondary dark:hover:bg-dark-secondary";
</script>

<template>
	<UButton
		:icon="icon"
		:ui="style"
		:size="props.size"
		:aria-label="label ? label : localize('generic.icon_button')"
		@click="clickCallback"
	/>
</template>
