<script setup lang="ts">
// localization
const localize = useI18n().t;

const props = defineProps<{
	open: boolean;
	closeModal: () => void;
}>();

const searching = ref(false);

const items = [
	{
		id: "twitch",
		label: "Twitch",
		icon: "i-ri-twitch-fill",
		background: "bg-twitch-background dark:bg-twitch-background",
		color: "text-twitch-icon dark:text-twitch-icon",
	},
	{
		id: "youtube",
		label: "Youtube",
		disabled: true,
		icon: "i-ri-youtube-fill",
		background: "bg-youtube-background dark:bg-youtube-background",
		color: "text-youtube-icon dark:text-youtube-icon",
	},
	{
		id: "kick",
		label: "Kick",
		disabled: true,
		icon: "i-ri-kick-fill",
		background: "bg-kick-background dark:bg-kick-background",
		color: "text-kick-icon dark:text-kick-icon",
	},
];

const currentTab = ref("twitch");
const selected = computed({
	get() {
		const index = items.findIndex((item) => item.id === currentTab.value);
		if (index === -1) {
			return 0;
		}
		return index;
	},
	set(value) {
		currentTab.value = items[value].id;
	},
});
const background = computed(() => {
	return items[items.findIndex((item) => item.id === currentTab.value)]
		.background;
});
const color = computed(() => {
	return items[items.findIndex((item) => item.id === currentTab.value)].color;
});
</script>

<template>
	<Modal :open="props.open" :closeModal="props.closeModal">
		<!-- Header -->
		<template #header>
			<h3
				class="text-base font-semibold text-light-text dark:text-dark-text"
			>
				{{ localize("modal.add_channel.header") }}
			</h3>
		</template>

		<!-- Body -->
		<template #default>
			<!-- Platform Selection -->
			<UTabs
				v-model="selected"
				:items="items"
				:ui="{
					list: {
						background: '',
						rounded: 'rounded-md',
						height: '',
						marker: {
							background: background,
						},
						tab: {
							padding: 'px-6',
							active: color,
							inactive:
								'text-light-text-placeholder dark:text-dark-text-placeholder',
						},
					},
				}"
				><template #default="{ item }">
					<div class="flex items-center gap-2 relative truncate">
						<UIcon
							:name="item.icon"
							class="w-6 h-6 flex-shrink-0 mr-2"
						/>
						<span class="truncate font-bold text-base">{{
							item.label
						}}</span>
					</div>
				</template></UTabs
			>

			<div class="pb-7" />

			<!-- Channel Search Input -->
			<Input
				icon="i-tabler-user-search"
				:loading="searching"
				:placeholder="localize('modal.add_channel.input.placeholder')"
			/>
		</template>

		<!-- Footer -->
		<template #footer>
			<UButton
				class="flex float-right font-bold text-light-text dark:text-dark-text bg-light-accent dark:bg-dark-accent"
				@click="searching = true"
				:disabled="searching"
				>{{ localize("modal.add_channel.button.find") }}</UButton
			>
		</template>
	</Modal>
</template>
