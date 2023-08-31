<script setup lang="ts">
import { computed, provide } from "vue";
import useStore from "src/store/store";

import ChatBottom from "src/components/views/HomeView/Chat/ChatBottom/ChatBottom.vue";
import ChatMiddle from "src/components/views/HomeView/Chat/ChatMiddle/ChatMiddle.vue";
import ChatTop from "src/components/views/HomeView/Chat/ChatTop/ChatTop.vue";

const store = useStore();

// find the channel's data
const activeChannelData = computed(
	(): ITwitchChannelData | IYoutubeChannelData | IKickChannelData | null => {
		// find channel data
		let channel:
			| ITwitchChannelData
			| IYoutubeChannelData
			| IKickChannelData;

		// twitch channel
		if (store.activeView.data?.platform === "twitch") {
			channel = store.channelData[store.activeView.data?.platform].find(
				(channel: ITwitchChannelData) =>
					channel.id === store.activeView.data?.id
			) as ITwitchChannelData;
			return channel != null ? channel : null;
		}

		// youtube channel
		else if (store.activeView.data?.platform === "youtube") {
			channel = store.channelData[store.activeView.data?.platform].find(
				(channel: IYoutubeChannelData) =>
					channel.id === store.activeView.data?.id
			) as IYoutubeChannelData;
			return channel != null ? channel : null;
		}

		// kick channel
		else if (store.activeView.data?.platform === "kick") {
			channel = store.channelData[store.activeView.data?.platform].find(
				(channel: IKickChannelData) =>
					channel.id === store.activeView.data?.id
			) as IKickChannelData;
			return channel != null ? channel : null;
		}

		// no channel found
		return null;
	}
);

// provide the active channel to children
provide("activeChannel", activeChannelData.value);
</script>

<template>
	<div v-if="activeChannelData" class="h-full flex flex-col scrollbar-hidden">
		<ChatTop />
		<ChatMiddle />
		<ChatBottom />
	</div>
</template>
