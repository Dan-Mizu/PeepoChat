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
		size: "xl",
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
	<ClientOnly>
		<UButton
			:icon="icon"
			:ui="style"
			:size="props.size"
			:aria-label="label ? label : localize('generic.icon_button')"
			@click="clickCallback"
		/>

		<template #fallback>
			<div class="w-8 h-8" />
		</template>
	</ClientOnly>
</template>
