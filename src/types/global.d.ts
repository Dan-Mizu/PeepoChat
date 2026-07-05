import {
	type HelixBroadcasterType,
	type HelixStreamType,
	type HelixUserType,
} from '@twurple/api';

declare global {
	// Local Settings
	interface ISettings {
		// Current state of Sidebar visibility
		isSidebarExpanded: boolean;
	}

	// Chat Badge List
	interface IChatBadgeList {
		// badge name
		[key: string]: {
			// badge version
			[key: string]: {
				title: string;
				description: string;
				url: string;
				previewUrl: string;
				clickAction: string | null;
				clickUrl: string | null;
			};
		};
	}

	// Twitch User
	interface ITwitchUser {
		type: HelixUserType;
		id: string;
		name: string;
		displayName: string;
		broadcasterType: HelixBroadcasterType;
		creationDate: string;
		description: string;
		offlinePlaceholderUrl: string;
		profilePictureUrl: string;
	}

	// Twitch Stream
	interface ITwitchStream {
		id: string;
		type: HelixStreamType;
		title: string;
		gameId: string;
		gameName: string;
		isMature: boolean;
		language: string;
		startDate: string;
		tags: string[];
		thumbnailUrl: string;
		userDisplayName: string;
		userId: string;
		userName: string;
		viewers: number;
	}

	// Channel
	interface IChannel {
		name: string;
		avatarURL: string;
		live: boolean;
		pinned: boolean;
		platform: {
			twitch?: string;
		};
	}

	// 7TV Emote Set
	interface I7TVEmoteSet {
		id: string;
		name: string;
		flags: number;
		tags: string[];
		immutable: boolean;
		privileged: boolean;
		emotes: I7TVEmote[];
		emote_count: number;
		capacity: number;
		owner?: {
			id: string;
			username: string;
			display_name: string;
			avatar_url: string;
		};
	}

	// 7TV Emote
	interface I7TVEmote {
		id: string;
		name: string;
		flags: number;
		timestamp: number;
		actor_id?: string;
		data: {
			id: string;
			name: string;
			flags: number;
			lifecycle: number;
			listed: boolean;
			animated: boolean;
			owner: {
				id: string;
				username: string;
				display_name: string;
				avatar_url: string;
				style?: any;
				roles?: string[];
			};
			host: {
				url: string;
				files: Array<{
					name: string;
					static_name: string;
					width: number;
					height: number;
					frame_count: number;
					size: number;
					format: string;
				}>;
			};
		};
	}

	// 7TV User Response
	interface I7TVUserResponse {
		id: string;
		platform: string;
		username: string;
		display_name: string;
		linked_platforms: Record<string, any>;
		emote_set: I7TVEmoteSet | null;
		emote_sets: I7TVEmoteSet[];
		user?: {
			id: string;
			username: string;
			display_name: string;
			created_at: string;
			avatar_url: string;
		};
	}

	// Message Components
	type EmoteSource = 'twitch' | '7tv';

	interface IEmoteStack {
		id: string;
		name: string;
		source: EmoteSource;
		isBase: boolean;
		isZeroWidth: boolean;
	}

	interface IMessageTextNode {
		type: 'text';
		content: string;
	}

	interface IMessageEmoteNode {
		type: 'emote';
		id: string;
		name: string;
		source: EmoteSource;
		isZeroWidth?: boolean;
		zeroWidthEmotes?: Array<{
			id: string;
			name: string;
			source: EmoteSource;
		}>;
	}

	type IMessageNode = IMessageTextNode | IMessageEmoteNode;

	interface IMessageEntry {
		position: number;
		node: IMessageNode;
		stack?: IEmoteStack[];
	}
}
