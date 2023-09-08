import { defineStore } from "pinia";
import type { Ref } from "vue";
import { ref } from "vue";

import defaults from "src/store/defaults";

const useStore = defineStore("chat", () => {
	// local storage
	const storage = JSON.parse(localStorage.getItem("chat") || "{}");

	// data refs
	const user: Ref<IUser> = ref(storage.user || defaults.user);
	const channelData: Ref<IAllChannelData> = ref(
		storage.channelData || defaults.channelData
	);
	const settings: Ref<ISettings> = ref(
		storage.settings || defaults.defaultSettings
	);
	const recentEmoji: Ref<IEmoji[]> = ref(storage.recentEmoji || []);
	const emojiSkinTone: Ref<string> = ref(storage.emojiSkinTone || "neutral");

	// ui refs
	const activeView: Ref<IActiveView> = ref({ type: "chat" });

	return {
		user,
		channelData,
		settings,
		recentEmoji,
		emojiSkinTone,
		activeView,
	};
});

export default useStore;
