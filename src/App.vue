<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { invoke } from "@tauri-apps/api/tauri";

import useStore from "src/store/store";
import { fetchData } from "src/store/defaults";

import FadeTransition from "src/components/ui/transitions/FadeTransition.vue";

const store = useStore();

// update localStorage with state changes
store.$subscribe((_mutation, state) => {
	localStorage.setItem("chat", JSON.stringify(state));
});

// here we load the data from the server.
onMounted(async () => {
	store.status = "loading";

	// fake server call
	setTimeout(() => {
		store.delayLoading = false;
	});
	const request = await fetchData();

	store.$patch({
		status: "success",
		settings: store.settings,
		user: request.data.user,
		channelData: request.data.channel,
	});
});

// the app height
const height = ref(`${window.innerHeight}px`);

// change the app height to the window hight.
const resizeWindow = () => {
	height.value = `${window.innerHeight}px`;
};

// prevent right-click context menu
const preventContextMenu = (event: MouseEvent) => {
	event.preventDefault();
};

// add events when the component mounts.
onMounted(async () => {
	window.addEventListener("resize", resizeWindow);
	window.addEventListener("contextmenu", preventContextMenu);

	await getChannelInfo();
});

// remove events when un-mounting the component.
onUnmounted(() => {
	window.removeEventListener("resize", resizeWindow);
	window.removeEventListener("contextmenu", preventContextMenu);
});

// update channel info
const getChannelInfo = async () => {
	for (const channel of store.user.channels) {
		// twitch channels only
		if (channel.platform !== "twitch") continue;

		// find channel data
		let channelData = store.channelData["twitch"].find(
			(channelData) => channelData.id === channel.id
		) as ITwitchChannelData;

		// get twitch channel data
		await (
			invoke("get_twitch_channel", {
				userId: channel.id.toString(),
			}) as Promise<ITwitchChannelResponse>
		).then((response) => {
			// update username
			channelData.username = response.broadcaster_login;

			// update stream data
			channelData.stream = {
				title: response.title,
				category: response.game_name,
				viewers: 0, //TODO: Implement actual live stream data
				uptime: 0, //TODO: Implement actual live stream data
			};
		});

		// get twitch user info
		await (
			invoke("get_twitch_user", {
				username: channelData?.username,
			}) as Promise<ITwitchUserResponse>
		).then((response) => {
			channelData.avatar = response.profile_image_url;
		});
	}
};
</script>

<template>
	<div :class="{ dark: store.settings.darkMode }">
		<div
			class="bg-light-secondary dark:bg-dark-secondary transition-colors duration-500"
			:style="{ height: height }"
		>
			<router-view v-slot="{ Component }">
				<FadeTransition>
					<component :is="Component" />
				</FadeTransition>
			</router-view>
		</div>
	</div>
</template>
