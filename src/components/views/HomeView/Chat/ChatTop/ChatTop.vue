<script setup lang="ts">
import { ref, inject, onMounted, onUnmounted } from "vue";
import Popover from "src/components/ui/data-display/Popover.vue";

import Lang from "src/assets/lang/en_us.json";

import {
	IconDeviceGamePad,
	IconUsers,
	IconClockHour4,
} from "@tabler/icons-vue";

// get channel info
const channel = <ITwitchChannelData | IYoutubeChannelData | IKickChannelData>(
	inject("activeChannel")
);

// add events when the component mounts.
onMounted(async () => {
	window.addEventListener("resize", resizeWindow);
});

// remove events when un-mounting the component.
onUnmounted(() => {
	window.removeEventListener("resize", resizeWindow);
});

// sets mobile view mode
const resizeWindow = () => {
	mobileView.value = window.outerWidth <= 968 ? true : false;
};

// check if in mobile view mode on load
const mobileView = ref(false);
resizeWindow();
</script>

<template>
	<!-- Show Title on Name/Title Hover if Live and Mobile Mode -->
	<Popover class="px-3 py-2 text-xs">
		<template #content v-if="channel.stream && mobileView">
			{{ channel.stream.title }}
		</template>

		<!-- Header Background -->
		<div
			class="max-w-full flex items-center h-7 border-b-2 border-light-secondary dark:border-dark-secondary transition-all duration-500"
		>
			<!--Channel Username-->
			<span
				class="text-light-text dark:text-dark-text transition-all duration-500 pl-4"
				>{{ channel.username }}</span
			>

			<!-- Live Only Content -->
			<template v-if="channel.stream">
				<!-- Live Indicator -->
				<span
					v-if="channel.stream"
					class="text-white bg-light-live dark:bg-dark-live rounded-[0.2rem] px-[3px] text-xs font-bold ml-2 transition-all duration-500 select-none"
					>{{ Lang.chatHeader.live }}</span
				>

				<!-- Channel Title -->
				<span class="truncate">
					<span
						class="text-light-text dark:text-dark-text ml-2 transition-all duration-500 select-none"
						>-</span
					>
					<span
						class="text-light-text dark:text-dark-text ml-2 text-sm transition-all duration-500"
						>{{ channel.stream.title }}</span
					>
				</span>

				<!-- Channel Info (collapsible, always shows on right) -->
				<span
					class="text-xs px-4 items-center absolute flex right-0 bg-light-primary dark:bg-dark-primary transition-all duration-500"
				>
					<!-- Category -->
					<Popover class="px-3 py-2 text-xs">
						<template #content v-if="mobileView">
							{{
								channel.stream.category != ""
									? "Category: " + channel.stream.category
									: "No Category"
							}}
						</template>
						<IconDeviceGamePad
							class="text-light-text dark:text-dark-text transition duration-500 h-[5] mr-2"
						/>
					</Popover>
					<span
						v-if="!mobileView"
						class="text-light-text dark:text-dark-text transition duration-500 pl-2 pr-4"
						>{{
							channel.stream.category != ""
								? channel.stream.category
								: "No Category"
						}}</span
					>

					<!-- Viewers -->
					<Popover class="px-3 py-2 text-xs">
						<template #content v-if="mobileView">
							{{
								channel.stream.viewers > 0
									? "Viewers: " +
									  channel.stream.viewers.toLocaleString()
									: "No Viewers"
							}}
						</template>
						<IconUsers
							class="text-light-text dark:text-dark-text transition duration-500 h-[20px] mr-2"
						/>
					</Popover>
					<span
						v-if="!mobileView"
						class="text-light-text dark:text-dark-text transition duration-500 pl-2 pr-4"
						>{{
							channel.stream.viewers > 0
								? channel.stream.viewers.toLocaleString()
								: "No Viewers"
						}}</span
					>

					<!-- Uptime -->
					<Popover class="px-3 py-2 text-xs">
						<template #content v-if="mobileView">
							{{
								channel.stream.uptime > 0
									? "Uptime: " +
									  new Date(channel.stream.uptime * 1000)
											.toISOString()
											.slice(11, 16)
									: "Just Started"
							}}
						</template>
						<IconClockHour4
							class="text-light-text dark:text-dark-text transition duration-500 h-[20px]"
						/>
					</Popover>
					<span
						v-if="!mobileView"
						class="text-light-text dark:text-dark-text transition duration-500 pl-2"
						>{{
							channel.stream.uptime > 0
								? new Date(channel.stream.uptime * 1000)
										.toISOString()
										.slice(11, 16)
								: "Just Started"
						}}</span
					>
				</span>
			</template>
		</div>
	</Popover>
</template>
