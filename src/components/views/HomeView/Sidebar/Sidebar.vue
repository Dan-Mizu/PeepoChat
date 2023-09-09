<script setup lang="ts">
import { ref } from "vue";
import ChannelButton from "src/components/views/HomeView/Sidebar/ChannelButton.vue";
import AccountButton from "src/components/views/HomeView/Sidebar/AccountButton.vue";
import IconButton from "src/components/ui/inputs/IconButton.vue";
import NavLink from "src/components/views/HomeView/Sidebar/NavLink.vue";
import AddChannelModal from "./AddChannelModal.vue";

import {
	IconMoonFilled,
	IconSunFilled,
	IconAt,
	IconPlus,
} from "@tabler/icons-vue";

import Lang from "src/assets/lang/en_us.json";

import useStore from "src/store/store";
const store = useStore();

// toggle dark mode theme button
const toggleDarkMode = () => {
	// toggle
	store.settings.darkMode = !store.settings.darkMode;
};

// open modal used to send multiple attachments attachments.
const openAddChannelModel = ref(false);
</script>

<template>
	<div
		class="w-11 h-full py-7 flex flex-col items-center transition-all duration-500"
	>
		<!-- Channels -->
		<div
			class="grow w-full px-5 pt-3 flex overflow-y-scroll scrollbar-hidden justify-center"
		>
			<nav aria-label="Channels">
				<ul>
					<li v-for="(channel, _index) in store.user.channels">
						<ChannelButton
							label="channel-button"
							class="block"
							aria-labelledby="channel-button"
							:channel-id="channel.id"
							:channel-platform="channel.platform"
						/>
					</li>
					<li class="flex justify-center">
						<IconButton
							variant="primary"
							class="hover:scale-110"
							@click="openAddChannelModel = true"
						>
							<IconPlus
								class="text-light-tertiary dark:text-dark-tertiary transition duration-500 m-3"
							></IconPlus>
						</IconButton>
					</li>
				</ul>
			</nav>
		</div>

		<!-- Options and Personal Views -->
		<div class="mt-5">
			<nav aria-label="Personal Settings">
				<!--toggle dark mode button-->
				<NavLink
					:icon="
						store.settings.darkMode ? IconSunFilled : IconMoonFilled
					"
					:title="Lang.toggleDarkMode"
					@click="toggleDarkMode()"
				/>
				<!--mentions page-->
				<NavLink
					:icon="IconAt"
					:title="Lang.viewMentionsPage"
					:background="true"
					@click="
						() => {
							store.activeView = { type: 'mentions' };
						}
					"
				/>
			</nav>

			<!--separator-->
			<hr
				class="block my-6 border-light-tertiary dark:border-dark-tertiary transition-all duration-500"
			/>

			<!--user avatar-->
			<AccountButton
				id="profile-button"
				class="block"
				aria-labelledby="profile-button"
			/>
		</div>

		<AddChannelModal
			:open="openAddChannelModel"
			:close-modal="() => (openAddChannelModel = false)"
		/>
	</div>
</template>
