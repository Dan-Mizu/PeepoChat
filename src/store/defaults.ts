const defaults = {
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

	// user not authenticated, but has channels saved
	user: {
		channels: [
			{
				id: 12943173,
				platform: "twitch",
			},
			{
				id: "UCvQczq3aHiHRBGEx-BKdrcg",
				platform: "youtube",
			},
			{
				id: 723,
				platform: "kick",
			},
			{
				id: 96858382,
				pinned: true,
				platform: "twitch",
			},
		],
	} as IUser,

	// cached channel data
	channelData: {
		twitch: [
			{
				id: 12943173,
				username: "pokelawls",
				avatar: "https://static-cdn.jtvnw.net/jtv_user_pictures/aa68742d-ae1f-4fb7-9d0c-e1756d5204b0-profile_image-150x150.jpg",
				stream: {
					title: "ADDICTION CONTINUES DAY 2 WIPE",
					category: "Dark and Darker",
					viewers: 4102,
					uptime: 4860,
				},
			},
			{
				id: 96858382,
				username: "erobb221",
				avatar: "https://static-cdn.jtvnw.net/jtv_user_pictures/85cb7c2f-41ad-4cec-a054-287f56e264ed-profile_image-150x150.png",
			},
		],
		youtube: [
			{
				id: "UCvQczq3aHiHRBGEx-BKdrcg",
				username: "Myth",
				avatar: "https://yt3.googleusercontent.com/ytc/AOPolaTB50sdjG9Y3WFhLRc2DbJnx8cXi8QMIECBPuBd4A=s176-c-k-c0x00ffffff-no-rj",
				stream: {
					title: "Test",
					category: "Test",
					viewers: 69,
					uptime: 420,
				},
			},
		],
		kick: [
			{
				id: 723,
				username: "Trainwreckstv",
				avatar: "https://files.kick.com/images/user/723/profile_image/conversion/87a305ea-3bc8-4e65-8772-9a453e8b9f37-fullsize.webp",
				stream: {
					title: "Test",
					category: "Test",
					viewers: 69,
					uptime: 420,
				},
			},
		],
	} as IAllChannelData,
};

export default defaults;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchData = async () => {
	// await delay(2000);

	return await {
		data: {
			user: defaults.user,
			channel: defaults.channelData,
		},
	};
};

export const updateAccount = async () => {
	await delay(4000);

	return await {
		data: {
			detail: "Your account has been updated successfully",
		},
	};
};
