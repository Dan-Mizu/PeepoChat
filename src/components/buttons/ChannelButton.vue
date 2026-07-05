<script setup lang="ts">
// get state
import useStore from '~/store';
const store = useStore();

// localization
const localize = useI18n().t;

// properties
const props = defineProps<{
	channel: IChannel;
}>();

// methods
const handleRemove = () => {
	const index = store.channels.findIndex(
		(c) => c.name.toLowerCase() === props.channel.name.toLowerCase()
	);
	if (index !== -1) {
		store.channels.splice(index, 1);
	}
};

const handlePin = () => {
	const channel = store.channels.find(
		(c) => c.name.toLowerCase() === props.channel.name.toLowerCase()
	);
	if (channel) {
		channel.pinned = !channel.pinned;
	}
};

const handleChannelClick = () => {
	const route = useRoute();
	const newPath = '/channel/twitch/' + props.channel.platform.twitch;
	// Force full page reload if navigating to different channel
	if (route.path !== newPath) {
		window.location.href = newPath;
	}
};

// computed for pin label
const pinLabel = computed(() => {
	return props.channel.pinned
		? localize('sidebar.channel.dropdown.unpin')
		: localize('sidebar.channel.dropdown.pin');
});

// dropdown contents
const dropdownContentAnon = computed(() => [
	[
		{
			label: localize('sidebar.channel.dropdown.visit_stream'),
			icon: 'i-ic-outline-ondemand-video',
			to: 'https://www.twitch.tv/' + props.channel.name,
			noRel: true,
			target: '_blank',
		},
	],
	[
		{
			label: pinLabel.value,
			icon: 'i-ic-round-push-pin',
			click: handlePin,
		},
	],
	[
		{
			label: localize('sidebar.channel.dropdown.remove'),
			icon: 'i-ic-baseline-remove-circle',
			click: handleRemove,
		},
	],
]);

// only one popover (menu or tooltip) is visible at a time app-wide; also
// closes when the pointer leaves the trigger/menu (with a grace period)
const {
	isOpen: dropdownOpen,
	cancelClose,
	scheduleClose,
} = useExclusiveMenu(`channel-menu:${props.channel.name}`);
</script>

<template>
	<!-- Account Settings Dropdown -->
	<UDropdown
		:items="dropdownContentAnon"
		:ui="{
			container: 'pl-2',
			ring: '',
			divide: '',
			item: {
				active: 'bg-primary-color',
				disabled: 'cursor-text select-text',
			},
			padding: 'p-1',
		}"
		:popper="{ placement: 'right' }"
		v-model:open="dropdownOpen"
		@mouseenter="cancelClose"
		@mouseleave="scheduleClose"
	>
		<!-- Button Trigger -->
		<Button
			:label="props.channel.name"
			variant="hidden"
			@click="handleChannelClick"
			@click.right="
				() => {
					dropdownOpen = true;
				}
			"
		>
			<template #content>
				<!-- Avatar Icon -->
				<UAvatar
					:src="props.channel.avatarURL"
					:ui="{
						rounded: 'rounded-3xl',
						wrapper:
							'relative inline-flex items-center justify-center flex-shrink-0',
						size: {
							sm: 'h-9 w-9 text-base',
						},
					}"
					:class="
						'hover:scale-[1.1] duration-100 ' +
						(props.channel.live
							? 'ring-2 ring-live ring-offset-2 ring-offset-gray-50 dark:ring-offset-gray-900'
							: 'ring-0')
					"
				/>
			</template>

			<template #tooltip>
				<div class="flex gap-x-2">
					{{ props.channel.name }}
					<LiveBadge v-if="props.channel.live" />
				</div>
			</template>
		</Button>

		<!-- Dropdown Items -->
		<template #item="{ item }">
			<UIcon :name="item.icon" class="h-5 w-5" />
			<span class="truncate">{{ item.label }}</span>
		</template>
	</UDropdown>
</template>
