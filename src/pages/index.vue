<script setup lang="ts">
// views
import LoadingView from "~/components/views/LoadingView.vue";
import NoChannelSelectedView from "~/components/views/NoChannelSelectedView.vue";
import NoMentionsView from "~/components/views/NoMentionsView.vue";

// get state
import useStore from "~/store/store";
const store = useStore();

// TODO: Change the activeView store to the Components themselves instead of strings, so skip the middleman
// the active chat component or loading component.
const activeView = computed(() => {
	// loading
	if (store.activeView.type === "loading") return LoadingView;
	// chat page
	else if (store.activeView.type === "chat") {
		// if (store.activeView.data) return Chat;
		// else return NoChannelSelectedView;
		return NoChannelSelectedView;
	}
	// mentions page
	else if (store.activeView.type === "mentions") return NoMentionsView;
	// fallback
	else return NoChannelSelectedView;
});
</script>

<template>
	<KeepAlive>
		<div class="static h-full flex flex-row overflow-hidden">
			<!-- Sidebar -->
			<Sidebar v-if="store.settings.showSidebar" class="-order-none" />

			<!-- Main View -->
			<div
				id="mainView"
				class="static grow h-full w-fit scrollbar-hidden"
				role="region"
			>
				<component
					:is="activeView"
					:key="(store.activeView.data?.id as number)"
				/>
			</div>
		</div>
	</KeepAlive>
</template>
