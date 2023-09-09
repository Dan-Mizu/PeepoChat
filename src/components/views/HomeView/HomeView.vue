<script setup lang="ts">
import { computed } from "vue";
import FadeTransition from "src/components/ui/transitions/FadeTransition.vue";
import Loading from "src/components/states/loading-states/Loading.vue";
import NoChatSelected from "src/components/states/empty-states/NoChatSelected.vue";
import NoMentions from "src/components/states/empty-states/NoMentions.vue";
import Sidebar from "src/components/views/HomeView/Sidebar/Sidebar.vue";
import Chat from "src/components/views/HomeView/Chat/Chat.vue";

import useStore from "src/store/store";
const store = useStore();

// the active chat component or loading component.
const activeChatComponent = computed(() => {
	// loading
	if (store.activeView.type === "loading") return Loading;
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
</script>

<template>
	<KeepAlive>
		<div class="static h-full flex flex-row overflow-hidden">
			<!--sidebar-->
			<Sidebar v-if="store.settings.showSidebar" class="-order-none" />

			<!--chat-->
			<div
				id="mainContent"
				class="static grow h-full w-fit scrollbar-hidden bg-light-primary dark:bg-dark-primary transition-all duration-500"
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
