/** Local Settings */
interface ISettings {
	/** Current state of Dark Mode theme */
	darkMode: boolean;
	/** Current state of Sidebar visibility */
	showSidebar: boolean;
}

/** PeepoChat User Data */
interface IUser {
	/**
	 * The user's numeric identifier.
	 *
	 * `null` or `undefined` when not authenticated.
	 */
	id?: number | null;
	/**
	 * The user's profile picture.
	 *
	 * Set to the standard anonymous image when not authenticated.
	 */
	avatar?: string;
	/** A list of channels the user has saved, in order. */
	channels: (
		| ISavedTwitchChannel
		| ISavedYoutubeChannel
		| ISavedKickChannel
	)[];
}

/** Common properties to saved channels from any platform */
interface ISavedChannel {
	/** The URL to the profile picture of this streamer. */
	avatar: string;
	/**
	 * Whether this channel is pinned on the sidebar.
	 *
	 * If true, it will show on the sidebar while offline channels are minimized regardless of this channel's live status.
	 */
	pinned?: boolean;
}

/** Twitch Specific Saved Channel Info */
interface ISavedTwitchChannel extends ISavedChannel {
	/** Numeric ID of this Twitch Channel. */
	id: number;
	/** Twitch Channel. */
	platform: "twitch";
	/** Twitch Login */
	login: string;
	/** Twitch Display Name */
	display_name: string;
}

/** Youtube Specific Channel Data */
interface ISavedYoutubeChannel extends ISavedChannel {
	/** String ID of this Youtube Channel. */
	id: string;
	/** Youtube Channel. */
	platform: "youtube";
}

/** Kick Specific Channel Data */
interface ISavedKickChannel extends ISavedChannel {
	/** Numeric ID of this Kick Channel. */
	id: number;
	/** Kick Channel. */
	platform: "kick";
}

/** State of current view */
interface IActiveView {
	/**
	 * The current view's type.
	 *
	 * - `chat` represents the chat of a certain channel. The data property then describes the channel.
	 *
	 * - `loading` represents that the view is currently loading.
	 *
	 * - `mentions` represents the page that shows the user's pings/mentions in any chat.
	 *
	 */
	type: "chat" | "loading" | "mentions";
	/** Holds any data that may be useful for the current view, such as the active channel's ID and platform. */
	data?: IActiveChat;
}

/** Data for current chat */
interface IActiveChat {
	/**
	 * The ID of the currently viewed channel.
	 *
	 * Twitch and Kick both use a numeric ID, while Youtube uses a string.
	 */
	id: number | string;
	/** The respective platform for the currently viewed channel. */
	platform: "twitch" | "youtube" | "kick";
}

/** Common properties to channel data on any platform */
interface IChannelData {
	/** Channel's display name. */
	username: string;
	/** Channel's profile picture. */
	avatar: string;
	/**
	 * Channel's stream data.
	 *
	 * Will be `undefined` if not live.
	 */
	stream?: {
		title: string;
		category: string;
		viewers: number;
		uptime: number;
	};
}

/** Twitch Specific Channel Data */
interface ITwitchChannelData extends IChannelData {
	/** Numeric ID of a Twitch Channel. */
	id: number;
	/** Twitch Channel */
	platform: "twitch";
}

/** Youtube Specific Channel Data */
interface IYoutubeChannelData extends IChannelData {
	/** String ID of a Youtube Channel. */
	id: string;
	/** Youtube Channel */
	platform: "youtube";
}

/** Kick Specific Channel Data */
interface IKickChannelData extends IChannelData {
	/** Numeric ID of a Kick Channel. */
	id: number;
	/** Kick Channel */
	platform: "kick";
}

/** Cached Channel Data */
interface IAllChannelData {
	/** List of Twitch Channel Data */
	twitch: ITwitchChannelData[];
	/** List of Youtube Channel Data */
	youtube: IYoutubeChannelData[];
	/** List of Kick Channel Data */
	kick: IKickChannelData[];
}

interface IEmoji {
	n: string[];
	u: string;
	r?: string;
	v?: string[];
}

/** Twitch API User Data Response */
interface ITwitchUserResponse {
	/** The type of broadcaster. Possible values are:
	 * - affiliate — An affiliate broadcaster
	 * - partner — A partner broadcaster
	 * - "" — A normal broadcaster
	 */
	broadcaster_type: "affiliate" | "partner" | "";
	/** The UTC date and time that the user’s account was created. The timestamp is in RFC3339 format. */
	created_at: string;
	/** The user’s description of their channel. */
	description: string;
	/** The user’s display name. */
	display_name: string;
	/**
	 * The user’s verified email address. The object includes this field only if the user access token includes the **user:read:email** scope.
	 *
	 * If the request contains more than one user, only the user associated with the access token that provided consent will include an email address — the email address for all other users will be empty.
	 */
	email: string | null;
	/** An ID that identifies the user. */
	id: string;
	/** The user’s login name. */
	login: string;
	/** A URL to the user’s offline image. */
	offline_image_url: string;
	/** A URL to the user’s profile image. */
	profile_image_url: string;
	/** The type of user. Possible values are:
	 * - admin — Twitch administrator
	 * - global_mod
	 * - staff — Twitch staff
	 * - "" — Normal user
	 */
	type: "admin" | "global_mod" | "staff" | "";
	/** The number of times the user’s channel has been viewed.
	 *
	 * **NOTE**: This field has been deprecated (see [Get Users API endpoint – “view_count” deprecation](https://discuss.dev.twitch.tv/t/get-users-api-endpoint-view-count-deprecation/37777)). Any data in this field is not valid and should not be used.
	 */
	view_count: number;
}

/** Twitch API Channel Data Response */
interface ITwitchChannelResponse {
	/** An ID that uniquely identifies the broadcaster. */
	broadcaster_id: string;
	/** The broadcaster’s preferred language. The value is an ISO 639-1 two-letter language code (for example, en for English). The value is set to “other” if the language is not a Twitch supported language. */
	broadcaster_language: string;
	/** The broadcaster’s login name. */
	broadcaster_login: string;
	/** The broadcaster’s display name. */
	broadcaster_name: string;
	/** The value of the broadcaster’s stream delay setting, in seconds. This field’s value defaults to zero unless 1) the request specifies a user access token, 2) the ID in the broadcaster_id query parameter matches the user ID in the access token, and 3) the broadcaster has partner status and they set a non-zero stream delay value. */
	delay: number;
	/** The channel’s description. */
	description: string;
	/** An ID that uniquely identifies the game that the broadcaster is playing or last played. The value is an empty string if the broadcaster has never played a game. */
	game_id: string;
	/** The name of the game that the broadcaster is playing or last played. The value is an empty string if the broadcaster has never played a game. */
	game_name: string;
	/** The tags applied to the channel. */
	tags: string[];
	/** The title of the stream that the broadcaster is currently streaming or last streamed. The value is an empty string if the broadcaster has never streamed. */
	title: string;
}
