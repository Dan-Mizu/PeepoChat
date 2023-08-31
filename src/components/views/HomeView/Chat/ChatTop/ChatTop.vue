<script setup lang="ts">
import {
	IconDeviceGamePad,
	IconUsers,
	IconClockHour4,
} from "@tabler/icons-vue";
import { inject } from "vue";

// get channel info
const channel = <ITwitchChannelData | IYoutubeChannelData | IKickChannelData>(
	inject("activeChannel")
);
</script>

<template>
	<div
		class="w-full h-7 border-b-2 border-light-secondary dark:border-dark-secondary transition-all duration-500 overflow-y-hidden"
	>
		<div class="px-5 py-2">
			<!--Channel Username-->
			<span
				class="text-light-text dark:text-dark-text transition-all duration-500"
				>{{ channel.username }}</span
			>

			<!-- Stream Info -->
			<span v-if="channel.stream">
				<!-- Left Side -->
				<span
					class="text-white bg-light-live dark:bg-dark-live rounded-[0.2rem] px-[3px] text-xs font-bold ml-2 transition-all duration-500 select-none"
					>LIVE</span
				>

				<!-- scroll title when small width -->
				<span class="overflow-auto whitespace-nowrap">
					<span
						class="text-light-text dark:text-dark-text ml-2 transition-all duration-500 select-none"
						>-</span
					>
					<span
						class="text-light-text dark:text-dark-text ml-2 text-sm transition-all duration-500"
						>{{ channel.stream.title }}</span
					>
				</span>

				<!-- Right Side -->
				<span
					class="flex float-right text-xs items-center xs:hidden md:flex"
				>
					<IconDeviceGamePad
						class="text-light-text dark:text-dark-text transition duration-500 h-5]"
					/>
					<span
						class="text-light-text dark:text-dark-text transition duration-500 pl-2 pr-4"
						>{{ channel.stream.category }}</span
					>
					<IconUsers
						class="text-light-text dark:text-dark-text transition duration-500 h-[20px]"
					/>
					<span
						class="text-light-text dark:text-dark-text transition duration-500 pl-2 pr-4"
						>{{ channel.stream.viewers.toLocaleString() }}</span
					>
					<IconClockHour4
						class="text-light-text dark:text-dark-text transition duration-500 h-[20px]"
					/>
					<span
						class="text-light-text dark:text-dark-text transition duration-500 pl-2"
						>{{
							new Date(channel.stream.uptime * 1000)
								.toISOString()
								.slice(11, 16)
						}}</span
					>
				</span>
				<span
					class="flex float-right text-xs items-center xs:flex md:hidden"
				>
					<Popper
						:content="'Category: ' + channel.stream.category"
						:hover="true"
					>
						<IconDeviceGamePad
							class="text-light-text dark:text-dark-text transition duration-500 h-5]"
						/>
					</Popper>
					<Popper
						:content="
							'Viewers: ' +
							channel.stream.viewers.toLocaleString()
						"
						:hover="true"
					>
						<IconUsers
							class="text-light-text dark:text-dark-text transition duration-500 h-[20px]"
						/>
					</Popper>
					<Popper
						:content="
							'Uptime: ' +
							new Date(channel.stream.uptime * 1000)
								.toISOString()
								.slice(11, 16)
						"
						:hover="true"
					>
						<IconClockHour4
							class="text-light-text dark:text-dark-text transition duration-500 h-[20px]"
						/>
					</Popper>
				</span>
			</span>
		</div>
	</div>
</template>