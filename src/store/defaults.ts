export default {
	// dark mode is on
	defaultSettings: {
		// set dark mode to user's OS setting
		darkMode:
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches
				? true
				: false,
		showSidebar: true,
	} as ISettings,

	// user not authenticated
	user: {
		channels: [],
	} as IUser,

	// cached channel data
	channelData: {
		twitch: [],
		youtube: [],
		kick: [],
	} as IAllChannelData,
};
