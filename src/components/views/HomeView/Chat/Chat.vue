<script setup lang="ts">
import { ref, provide, onMounted } from "vue";
import ChatBottom from "src/components/views/HomeView/Chat/ChatBottom/ChatBottom.vue";
import ChatMiddle from "src/components/views/HomeView/Chat/ChatMiddle/ChatMiddle.vue";
import ChatTop from "src/components/views/HomeView/Chat/ChatTop/ChatTop.vue";

import useStore from "src/store/store";
const store = useStore();

import { channel, setTitle } from "src/utils";

const activeChannelData = ref(
	channel.getData({
		id: store.activeView.data?.id as number,
		platform: "twitch",
	}) as ITwitchChannelData
);

onMounted(() => {
	// set title
	setTitle({ suffix: activeChannelData.value.username });
});

// provide the active channel to children
provide("activeChannel", activeChannelData);
</script>

<template>
	<div class="h-full flex flex-col scrollbar-hidden">
		<ChatTop />
		<ChatMiddle />
		<ChatBottom />
	</div>
</template>
