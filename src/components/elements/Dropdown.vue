<script setup lang="ts">
import type { DropdownItem } from "@nuxt/ui/dist/runtime/types/dropdown";

const props = withDefaults(
	defineProps<{
		items: DropdownItem[][];
		placement?: "bottom" | "right";
	}>(),
	{ mode: "click", placement: "right" }
);

// init default dropdown style
const style = {
	container: "pl-5",
	background: "bg-light-secondary dark:bg-dark-secondary",
	ring: "",
	divide: "divide-y divide-light-primary dark:divide-dark-primary",
	item: {
		active: "bg-light-primary dark:bg-dark-primary",
		disabled: "cursor-text select-text",
	},
	padding: "p-1",
};
</script>

<template>
	<UDropdown
		:items="props.items"
		:ui="style"
		:popper="{ placement: props.placement }"
		show
	>
		<slot />
		<!-- 
		<template #account="{ item }">
			<div class="text-left">
				<p>Signed in as</p>
				<p class="truncate font-medium text-gray-900 dark:text-white">
					{{ item.label }}
				</p>
			</div>
		</template> -->
		<template #item="{ item }" class="text-light-text dark:text-dark-text">
			<UIcon :name="item.icon" class="h-5 w-5" />
			<span class="truncate">{{ item.label }}</span>
		</template>
	</UDropdown>
</template>
