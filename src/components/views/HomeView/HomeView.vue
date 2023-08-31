<script setup lang="ts">
import { computed } from "vue";

import useStore from "src/store/store";

import Chat from "src/components/views/HomeView/Chat/Chat.vue";
import Navigation from "src/components/views/HomeView/Navigation/Navigation.vue";
import NoChatSelected from "src/components/states/empty-states/NoChatSelected.vue";
import Loading from "src/components/states/loading-states/Loading.vue";
import FadeTransition from "src/components/ui/transitions/FadeTransition.vue";
import NoMentions from "src/components/states/empty-states/NoMentions.vue";

const store = useStore();

// the active chat component or loading component.
const activeChatComponent = computed(() => {
	// loading
	if (store.status === "loading" || store.delayLoading) return Loading;
	// chat page
	else if (store.activeView.type === "chat") {
		if (store.activeView.data) return Chat;
		else return NoChatSelected;
	}
	// mentions page
	else if (store.activeView.type === "mentions") return NoMentions;
	// fallback
	else return NoChatSelected;
});

if (JSON.parse(localStorage.getItem("chat") as any).settings.darkMode)
	store.settings.darkMode = JSON.parse(
		localStorage.getItem("chat") as any
	).settings.darkMode;
</script>

<template>
	<KeepAlive>
		<div class="md:static h-full flex md:flex-row overflow-hidden">
			<!--navigation-bar-->
			<Navigation
				v-if="store.settings.showSidebar"
				class="md:-order-none"
			/>

			<!--chat-->
			<div
				id="mainContent"
				class="md:static grow h-full md:w-fit scrollbar-hidden bg-light-primary dark:bg-dark-primary transition-all duration-500"
				role="region"
			>
				<FadeTransition name="fade" mode="out-in" time="0.05s">
					<component
						:is="activeChatComponent"
						:key="(store.activeView.data?.id as number)"
					/>
				</FadeTransition>
			</div>
		</div>
	</KeepAlive>
</template>
