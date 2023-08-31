<script setup lang="ts">
import useStore from "src/store/store";

import { IconMoonFilled, IconSunFilled, IconAt } from "@tabler/icons-vue";
import ChannelButton from "src/components/views/HomeView/Navigation/ChannelButton.vue";
import AccountButton from "src/components/views/HomeView/Navigation/AccountButton.vue";
import NavLink from "src/components/views/HomeView/Navigation/NavLink.vue";
import Lang from "src/assets/lang/en_us.json";

const store = useStore();

const toggleDarkMode = () => {
	// toggle
	store.settings.darkMode = !store.settings.darkMode;
};
</script>

<template>
	<div
		class="w-11 h-full py-7 px-5 flex flex-col items-center transition-all duration-500"
	>
		<!--main navigation-->
		<div class="grow">
			<nav aria-label="Main navigation">
				<ul>
					<li v-for="(channel, _index) in store.user.channels">
						<ChannelButton
							id="channel-button"
							class="block"
							aria-labelledby="channel-button"
							:channel-id="channel.id"
							:channel-platform="channel.platform"
						/>
					</li>
				</ul>
			</nav>
		</div>

		<!--secondary navigation-->
		<div>
			<nav aria-label="Extra navigation">
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
	</div>
</template>
