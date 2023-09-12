import { defineStore } from "pinia";

// default state values
import defaults from "./defaults";

export default defineStore("chat", () => {
	// grab current local storage
	const storage = JSON.parse(localStorage.getItem("chat") || "{}");

	// values
	const user: Ref<IUser> = ref(storage.user || defaults.user);
	const channelData: Ref<IAllChannelData> = ref(
		storage.channelData || defaults.channelData
	);
	const settings: Ref<ISettings> = ref(
		storage.settings || defaults.defaultSettings
	);
	const recentEmoji: Ref<IEmoji[]> = ref(storage.recentEmoji || []);
	const emojiSkinTone: Ref<string> = ref(storage.emojiSkinTone || "neutral");
	const activeView: Ref<IActiveView> = ref({ type: "chat" });

	// methods

	// return public references
	return {
		user,
		channelData,
		settings,
		recentEmoji,
		emojiSkinTone,
		activeView,
	};
});
