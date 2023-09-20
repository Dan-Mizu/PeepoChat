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
	function getChannelDataFromID(
		providedChannel:
			| { id: number; platform: "twitch" | "kick" }
			| { id: string; platform: "youtube" }
	): ITwitchChannelData | IYoutubeChannelData | IKickChannelData | null {
		// find channel data
		let channel:
			| ITwitchChannelData
			| IYoutubeChannelData
			| IKickChannelData;

		// twitch channel
		if (providedChannel.platform === "twitch") {
			channel = channelData.value[providedChannel.platform].find(
				(channel: ITwitchChannelData) =>
					channel.id === providedChannel.id
			) as ITwitchChannelData;
			console.log(channelData.value, channel);
			return channel != null ? channel : null;
		}

		// youtube channel
		else if (providedChannel.platform === "youtube") {
			channel = channelData.value[providedChannel.platform].find(
				(channel: IYoutubeChannelData) =>
					channel.id === providedChannel.id
			) as IYoutubeChannelData;
			return channel != null ? channel : null;
		}

		// kick channel
		else if (providedChannel.platform === "kick") {
			channel = channelData.value[providedChannel.platform].find(
				(channel: IKickChannelData) => channel.id === providedChannel.id
			) as IKickChannelData;
			return channel != null ? channel : null;
		}

		// no channel found
		return null;
	}

	// return public references
	return {
		// values
		user,
		channelData,
		settings,
		recentEmoji,
		emojiSkinTone,
		activeView,

		// methods
		getChannelDataFromID,
	};
});
