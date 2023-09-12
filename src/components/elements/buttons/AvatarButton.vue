<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		class?: string;
		avatar?: string;
		ring?: boolean;
		ringStyle?: string;
		roundedType?: "full" | "md";
		clickCallback?: () => void;
		alt?: string;
	}>(),
	{
		ring: false,
		ringStyle: "ring-4 ring-light-accent dark:ring-dark-accent",
		avatar: "/img/anon.png",
		roundedType: "full",
	}
);

// init default avatar style
const style = {
	rounded: "rounded-full",
	wrapper: "relative inline-flex items-center justify-center flex-shrink-0 hover:scale-105 transition-transform duration-500",
};

// ring
if (props.ring && props.ringStyle) style.wrapper += " " + props.ringStyle;

// rounded
if (props.roundedType === "md") style.rounded = "rounded-md";
</script>

<template>
	<button :class="[props.class, 'justify-center']" @click="clickCallback">
		<UAvatar :src="avatar" :alt="alt" :ui="style" />
	</button>
</template>
