<script setup lang="ts">
import { computed, ref } from "vue";
import Dropdown from "src/components/ui/navigation/Dropdown/Dropdown.vue";
import DropdownLink from "src/components/ui/navigation/Dropdown/DropdownLink.vue";

import useStore from "src/store/store";
const store = useStore();

import {
	IconPinFilled,
	IconPinnedOff,
	IconCircleMinus,
	IconBrandTwitch,
	IconBrandYoutubeFilled,
	IconBrandKick,
} from "@tabler/icons-vue";

const props = defineProps<{
	id: string;
	channelId: number | string;
	channelPlatform: "twitch" | "youtube" | "kick";
}>();

// handle dropdown
const dropdownActive = ref(false);
const closeDropdown = () => {
	dropdownActive.value = false;
};
const showDropdown = () => {
	dropdownActive.value = true;
};

// (event) close dropdown menu when clicking outside
const handleCloseOnClickOutside = (event: Event) => {
	if (
		!["channel-avatar", "channel-button"].includes(
			(event.target as HTMLButtonElement).id
		)
	) {
		closeDropdown();
	}
};

// get reference to saved channel in user's data
const getSavedChannel = ():
	| ISavedTwitchChannel
	| ISavedYoutubeChannel
	| ISavedKickChannel
	| null => {
	// find channel data
	let channel = store.user.channels.find(
		(channel) => channel.id === props.channelId
	);
	return channel != null ? channel : null;
};

// get saved channel data
const savedChannel = ref(getSavedChannel());

// get channel data
const channelData = computed(
	(): ITwitchChannelData | IYoutubeChannelData | IKickChannelData | null => {
		// find channel data
		let channel:
			| ITwitchChannelData
			| IYoutubeChannelData
			| IKickChannelData;

		// twitch channel
		if (props.channelPlatform === "twitch") {
			channel = store.channelData[props.channelPlatform].find(
				(channel: ITwitchChannelData) => channel.id === props.channelId
			) as ITwitchChannelData;
			return channel != null ? channel : null;
		}

		// youtube channel
		else if (props.channelPlatform === "youtube") {
			channel = store.channelData[props.channelPlatform].find(
				(channel: IYoutubeChannelData) => channel.id === props.channelId
			) as IYoutubeChannelData;
			return channel != null ? channel : null;
		}

		// kick channel
		else if (props.channelPlatform === "kick") {
			channel = store.channelData[props.channelPlatform].find(
				(channel: IKickChannelData) => channel.id === props.channelId
			) as IKickChannelData;
			return channel != null ? channel : null;
		}

		// no channel found
		return null;
	}
);

// remove channel
const removeChannel = (): void => {
	// find and remove channel from saved channel array
	store.user.channels.splice(
		store.user.channels.findIndex(
			(channel) => channel.id === props.channelId
		),
		1
	);

	// close chat view if currently open
	if (store.activeView.data?.id === props.channelId)
		store.activeView.data = undefined;
};

// toggle pin
const togglePin = (): void => {
	if (savedChannel.value)
		savedChannel.value.pinned = !savedChannel.value.pinned;
};
</script>

<template>
	<div v-if="channelData" class="relative">
		<Popper :content="channelData.username" placement="right" :hover="true">
			<!--toggle dropdown button-->
			<button
				:id="props.id + '-button'"
				@click="
					() =>
						(store.activeView = {
							type: 'chat',
							data: {
								id: props.channelId,
								platform: props.channelPlatform,
							},
						})
				"
				@auxclick="showDropdown"
				v-bind:class="{
					'ring-light-live dark:ring-dark-live ring-2 ring-offset-2 ring-offset-light-secondary dark:ring-offset-dark-secondary transition duration-500':
						channelData.stream,
				}"
				class="bg-white mb-4 rounded-full focus:outline-none transition duration-500 hover:scale-105"
				:aria-expanded="dropdownActive"
				aria-controls="channel-button"
				aria-label="toggle channel menu"
			>
				<!-- avatar -->
				<div
					id="channel-avatar"
					:style="{
						backgroundImage: `url(${channelData.avatar})`,
					}"
					class="w-[55px] h-[55px] rounded-full bg-cover bg-center"
				></div>

				<!-- pin icon -->
				<div
					v-if="savedChannel?.pinned"
					class="absolute top-0 left-0 w-[20px] h-[20px] flex items-center justify-center bg-light-secondary dark:bg-dark-secondary rounded-full transition duration-500"
				>
					<IconPinFilled
						class="h-5 w-5 text-light-tertiary dark:text-dark-tertiary transition duration-500"
					/>
				</div>

				<!-- platform -->
				<div
					v-if="props.channelPlatform == 'twitch'"
					class="absolute top-0 right-0 w-[20px] h-[20px] flex items-center justify-center bg-twitch-background rounded-full"
				>
					<IconBrandTwitch class="h-5 w-5 text-twitch-icon" />
				</div>
				<div
					v-else-if="props.channelPlatform == 'youtube'"
					class="absolute top-0 right-0 w-[20px] h-[20px] flex items-center justify-center bg-youtube-background rounded-full"
				>
					<IconBrandYoutubeFilled class="w-5 text-youtube-icon" />
				</div>
				<div
					v-else-if="props.channelPlatform == 'kick'"
					class="absolute top-0 right-0 w-[20px] h-[20px] flex items-center justify-center bg-kick-background rounded-full"
				>
					<IconBrandKick
						class="h-5 w-5 text-kick-icon fill-current"
					/>
				</div>
			</button>

			<!--dropdown menu-->
			<Dropdown
				:id="props.id + '-dropdown'"
				:aria-labelledby="props.id + '-button'"
				:show="dropdownActive"
				:position="['bottom-0', 'left-[40px]', 'left-[-77px]']"
				:handle-click-outside="handleCloseOnClickOutside"
				:close-dropdown="closeDropdown"
			>
				<!-- pin/unpin channel -->
				<DropdownLink
					label="Pin"
					:handle-click="closeDropdown"
					tabindex="0"
					@click="togglePin()"
				>
					<div v-if="!savedChannel?.pinned" class="flex">
						<IconPinFilled
							class="h-5 w-5 mr-3 text-light-text dark:text-dark-text transition duration-500"
						/>
						<span>Pin</span>
					</div>
					<div v-else class="flex">
						<IconPinnedOff
							class="h-5 w-5 mr-3 text-light-text dark:text-dark-text transition duration-500"
						/>
						<span>Remove Pin</span>
					</div>
				</DropdownLink>

				<!-- remove channel -->
				<DropdownLink
					label="Remove"
					:handle-click="closeDropdown"
					tabindex="0"
					@click="removeChannel()"
				>
					<div class="flex">
						<IconCircleMinus
							class="h-5 w-5 mr-3 text-light-text dark:text-dark-text transition duration-500"
						/>
						<span>Remove Channel</span>
					</div>
				</DropdownLink>
			</Dropdown>
		</Popper>
	</div>
</template>
