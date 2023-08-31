import { defineStore } from "pinia";
import type { Ref } from "vue";
import { computed, ref } from "vue";

import defaults from "src/store/defaults";

const useStore = defineStore("chat", () => {
	// local storage
	const storage = JSON.parse(localStorage.getItem("chat") || "{}");

	// app status refs
	const status = ref("idle");

	// data refs
	const user: Ref<IUser> = ref(defaults.user);
	const channelData: Ref<IAllChannelData> = ref(defaults.channelData);
	const settings: Ref<ISettings> = ref(
		storage.settings || defaults.defaultSettings
	);
	const recentEmoji: Ref<IEmoji[]> = ref(storage.recentEmoji || []);
	const emojiSkinTone: Ref<string> = ref(storage.emojiSkinTone || "neutral");

	// ui refs
	const delayLoading = ref(true);
	const activeView: Ref<IActiveView> = ref({ type: "chat" });

	const getStatus = computed(() => status);

	return {
		// status refs
		status,
		getStatus,

		// data refs
		user,
		channelData,
		settings,
		recentEmoji,
		emojiSkinTone,

		// ui refs
		delayLoading,
		activeView,
	};
});

export default useStore;
