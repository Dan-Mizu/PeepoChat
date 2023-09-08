import { invoke } from "@tauri-apps/api/tauri";

import useStore from "src/store/store";

import { useToast, POSITION, TYPE } from "vue-toastification";
import { ToastOptions } from "vue-toastification/dist/types/types";

import Lang from "src/assets/lang/en_us.json";

/**
 * Convert unicode to native emoji
 *
 * @param unicode - emoji unicode
 */
export const unicodeToEmoji = (unicode: string) => {
	return unicode
		.split("-")
		.map((hex) => parseInt(hex, 16))
		.map((hex) => String.fromCodePoint(hex))
		.join("");
};

// toast config
const toastConfig = {
	position: POSITION.TOP_RIGHT,
	timeout: 2500,
	closeOnClick: true,
	pauseOnFocusLoss: true,
	pauseOnHover: true,
	draggable: true,
	draggablePercent: 0.6,
	showCloseButtonOnHover: true,
	hideProgressBar: true,
	closeButton: "button",
	icon: true,
	rtl: false,
} as ToastOptions;

/** Display a toast notification */
export const toast = {
	/**
	 * Display a toast notification
	 *
	 * @param message The toast message
	 */
	message: (message: string) => {
		useToast()(message, toastConfig as ToastOptions);
	},
	/**
	 * Display a toast notification
	 *
	 * @param message The toast message
	 */
	success: (message: string) => {
		useToast().success(
			message,
			toastConfig as ToastOptions & { type?: TYPE.SUCCESS | undefined }
		);
	},
	/**
	 * Display a toast notification
	 *
	 * @param message The toast message
	 */
	info: (message: string) => {
		useToast().info(
			message,
			toastConfig as ToastOptions & { type?: TYPE.INFO | undefined }
		);
	},
	/**
	 * Display a toast notification
	 *
	 * @param message The toast message
	 */
	warn: (message: string) => {
		useToast().warning(
			message,
			toastConfig as ToastOptions & { type?: TYPE.WARNING | undefined }
		);
	},
	/**
	 * Display a toast notification
	 *
	 * @param message The toast message
	 */
	error: (message: string) => {
		useToast().error(
			message,
			toastConfig as ToastOptions & { type?: TYPE.ERROR | undefined }
		);
	},
};

/**
 * Sets the window title with prefix and suffix
 *
 * @param text Object Containing optional Prefix and Suffix
 */
export const setTitle = (text?: { prefix?: string; suffix?: string }) => {
	// title with prefix and/or suffix
	if (text) {
		document.title =
			//prefix
			(text.prefix ? text.prefix + " " : "") +
			// normal
			Lang.window.title +
			// suffix
			(text.suffix ? " | " + text.suffix : "");
	}
	// default title
	else {
		document.title = Lang.window.title;
	}
};

/** Saved Channel and Channel Data Utilities  */
export const channel = {
	/**
	 *  Get Saved Channel Info
	 *
	 * @param id Channel ID
	 */
	get: (id: number | string) => {
		// get store instance
		const store = useStore();

		// find channel
		let channel = store.user.channels.find((channel) => channel.id === id);
		// return channel
		return channel != null ? channel : null;
	},

	/**
	 * Add Channel To Saved List
	 *
	 * @param providedChannel Channel ID and Respective Platform
	 */
	add: async (
		providedChannel:
			| ISavedTwitchChannel
			| ISavedYoutubeChannel
			| ISavedKickChannel
	) => {
		// get store instance
		const store = useStore();

		// update channel data
		if (
			providedChannel.platform === "twitch" ||
			providedChannel.platform === "kick"
		)
			await channel.updateData({
				id: providedChannel.id,
				platform: providedChannel.platform,
			});
		else
			await channel.updateData({
				id: providedChannel.id as string,
				platform: "youtube",
			});

		// add channel to top of list
		store.user.channels.unshift(providedChannel);
	},

	/**
	 * Remove Channel From Saved List
	 *
	 * @param id Channel ID
	 */
	remove: (id: number | string) => {
		// get store instance
		const store = useStore();

		// close chat view if currently open
		if (store.activeView.data?.id === id) store.activeView.data = undefined;

		// find and remove channel from saved channel array
		store.user.channels.splice(
			store.user.channels.findIndex((channel) => channel.id === id),
			1
		);

		// remove channel data
		store.channelData["twitch"].splice(
			store.channelData["twitch"].findIndex(
				(channel) => channel.id === id
			),
			1
		);
	},

	/**
	 * Get Channel Data
	 *
	 * @param providedChannel Channel ID and Respective Platform
	 */
	getData: (
		providedChannel:
			| { id: number; platform: "twitch" | "kick" }
			| { id: string; platform: "youtube" }
	): ITwitchChannelData | IYoutubeChannelData | IKickChannelData | null => {
		// get store instance
		const store = useStore();

		// find channel data
		let channel:
			| ITwitchChannelData
			| IYoutubeChannelData
			| IKickChannelData;

		// twitch channel
		if (providedChannel.platform === "twitch") {
			channel = store.channelData[providedChannel.platform].find(
				(channel: ITwitchChannelData) =>
					channel.id === providedChannel.id
			) as ITwitchChannelData;
			return channel != null ? channel : null;
		}

		// youtube channel
		else if (providedChannel.platform === "youtube") {
			channel = store.channelData[providedChannel.platform].find(
				(channel: IYoutubeChannelData) =>
					channel.id === providedChannel.id
			) as IYoutubeChannelData;
			return channel != null ? channel : null;
		}

		// kick channel
		else if (providedChannel.platform === "kick") {
			channel = store.channelData[providedChannel.platform].find(
				(channel: IKickChannelData) => channel.id === providedChannel.id
			) as IKickChannelData;
			return channel != null ? channel : null;
		}

		// no channel found
		return null;
	},

	/** Update All Saved Channel Data */
	updateAllData: async () => {
		// get store instance
		const store = useStore();

		for (const channel of store.user.channels) {
			// twitch channels only
			if (channel.platform !== "twitch") continue;

			// find channel data
			let channelData = store.channelData["twitch"].find(
				(channelData) => channelData.id === channel.id
			) as ITwitchChannelData;

			// get twitch channel data
			await (
				invoke("get_twitch_channel", {
					userId: channel.id.toString(),
				}) as Promise<ITwitchChannelResponse>
			).then((response) => {
				// update username
				channelData.username = response.broadcaster_login;

				// update stream data
				channelData.stream = {
					title: response.title,
					category: response.game_name,
					viewers: 0, //TODO: Implement actual live stream data
					uptime: 0, //TODO: Implement actual live stream data
				};
			});

			// get twitch user info
			await (
				invoke("get_twitch_user", {
					username: channelData?.username,
				}) as Promise<ITwitchUserResponse>
			).then((response) => {
				channelData.avatar = response.profile_image_url;
			});
		}
	},

	/**
	 * Update Specified Channel
	 *
	 * @param providedChannel Channel ID and Respective Platform
	 */
	updateData: async (
		providedChannel:
			| { id: number; platform: "twitch" | "kick" }
			| { id: string; platform: "youtube" }
	) => {
		// get store instance
		const store = useStore();

		// twitch
		if (providedChannel.platform === "twitch") {
			// check if channel data exists
			let channelData = store.channelData["twitch"].find(
				(channelData) => channelData.id === providedChannel.id
			) as ITwitchChannelData | undefined;

			// get twitch channel data
			await (
				invoke("get_twitch_channel", {
					userId: providedChannel.id.toString(),
				}) as Promise<ITwitchChannelResponse>
			).then((response) => {
				// update existing channel data
				if (channelData) {
					// update username
					channelData.username = response.broadcaster_login;

					// update stream data
					channelData.stream = {
						title: response.title,
						category: response.game_name,
						viewers: 0, //TODO: Implement actual live stream data
						uptime: 0, //TODO: Implement actual live stream data
					};
				}

				// add new channel data
				else {
					store.channelData["twitch"].push({
						id: providedChannel.id,
						platform: "twitch",
						username: response.broadcaster_name, //TODO: Apparently, this isn't accurate.
						avatar: "", //TODO: Better way to initialize avatar?
						stream: {
							title: response.title,
							category: response.game_name,
							viewers: 0, //TODO: Implement actual live stream data
							uptime: 0, //TODO: Implement actual live stream data
						},
					} as ITwitchChannelData);
				}
			});

			// get channel data
			if (!channelData)
				channelData = store.channelData["twitch"].find(
					(channelData) => channelData.id === providedChannel.id
				) as ITwitchChannelData | undefined;

			// get twitch user info
			await (
				invoke("get_twitch_user", {
					username: channelData?.username,
				}) as Promise<ITwitchUserResponse>
			).then((response) => {
				// TODO: Channel Data should exist by now due to previous API call, so figure out a better way to handle this~
				if (channelData) {
					// update display name
					channelData.username = response.display_name;

					// update avatar
					channelData.avatar = response.profile_image_url;
				}
			});
		}
	},
};
