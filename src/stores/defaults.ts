export default {
	// default settings
	defaultSettings: {
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
