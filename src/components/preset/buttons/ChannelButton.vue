<script setup lang="ts">
// types
import { DropdownItem } from "@nuxt/ui/dist/runtime/types/dropdown";

// localization
const localize = useI18n().t;

// get state
import useStore from "~/store/store";
const store = useStore();

const props = defineProps<{
	providedChannel:
		| ISavedTwitchChannel
		| ISavedKickChannel
		| ISavedYoutubeChannel;
}>();

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
	<UPopover
		mode="hover"
		:popper="{ placement: 'right' }"
		:ui="{
			container: 'pl-5',
			base: 'px-3 py-2 text-light-text dark:text-dark-text',
			background: 'bg-light-secondary dark:bg-dark-secondary',
		}"
	>
		<Dropdown :items="dropdownContent" disabled>
			<AvatarButton
				:avatar="providedChannel.avatar"
				ring
				ringStyle="ring-2 ring-offset-2 ring-light-live dark:ring-dark-live ring-offset-light-secondary dark:ring-offset-dark-secondary transition duration-500"
			/>
		</Dropdown>
		<template #panel>
			<span>{{ providedChannel.id }}</span>
		</template>
	</UPopover>
</template>
