<script setup lang="ts">
// types
import { DropdownItem } from "@nuxt/ui/dist/runtime/types/dropdown";

// localization
const localize = useI18n().t;

// dropdown contents
const dropdownContent: Ref<DropdownItem[][]> = ref([
	[
		{
			label: localize("sidebar.channel.dropdown.pin"),
			icon: "i-tabler-pin",
		},
	],
	[
		{
			label: localize("sidebar.channel.dropdown.delete"),
			icon: "i-tabler-square-rounded-minus",
		},
	],
]);
</script>

<template>
	<Dropdown :items="dropdownContent" disabled>
		<AvatarButton
			ring
			ringStyle="ring-2 ring-offset-2 ring-light-live dark:ring-dark-live ring-offset-light-secondary dark:ring-offset-dark-secondary transition duration-500"
		/>
	</Dropdown>
</template>
