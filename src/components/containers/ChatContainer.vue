<script setup lang="ts">
// localization
const localize = useI18n().t;

// get state
import useStore from '~/store';
const store = useStore();

// properties
const props = defineProps<{
	user: ITwitchUser;
}>();

// emits
const emit = defineEmits(['onChatConnection', 'onChatDisconnection']);

// chat container reference and state
const chatRef: Ref<HTMLElement | null> = ref(null);
const isChatAnchored: Ref<boolean> = ref(true);

// methods
const scrollToBottom = () => {
	// scroll to bottom of chat smoothly
	chatRef.value?.scrollTo({
		top: chatRef.value?.scrollHeight,
		left: 0,
		behavior: 'smooth',
	});

	// anchor the chat
	isChatAnchored.value = true;
};
const checkSnappedToBottomOfChat = () => {
	// if currently at the bottom of the chat, snap to it
	if (chatRef.value) {
		isChatAnchored.value =
			chatRef.value.scrollHeight - chatRef.value.clientHeight <=
			chatRef.value.scrollTop + 100;
	}
};
const disconnectTwitchChatClient = () => {
	// remove listeners
	twitchChatClient.removeListener(onConnect);
	twitchChatClient.removeListener(onDisconnect);
	twitchChatClient.removeListener(onMessage);

	// disconnect client
	twitchChatClient.quit();
};

// messages
import { ChatClient, type ChatMessage } from '@twurple/chat';
import type { Listener } from '@d-fischer/typed-event-emitter';
const messages: Ref<{ meta: ChatMessage; content: string }[]> = ref([]);
const maxChatMessages = ref(useAppConfig().maxChatMessages);
let twitchChatClient: ChatClient,
	onConnect: Listener,
	onDisconnect: Listener,
	onMessage: Listener;
let badges: Ref<IChatBadgeList> = ref(store.globalBadges);
let emotes7TV: Ref<I7TVEmoteSet | null> = ref(null);

// events
const onChatScroll = () => {
	checkSnappedToBottomOfChat();
};
onBeforeRouteLeave(() => {
	disconnectTwitchChatClient();
});
onBeforeRouteUpdate(() => {
	disconnectTwitchChatClient();
});
onMounted(() => {
	// connect anonymously to twitch chat
	twitchChatClient = new ChatClient({ channels: [props.user.name] });
	twitchChatClient.connect();

	// connect event
	onConnect = twitchChatClient.onConnect(() => {
		emit('onChatConnection');
	});

	// disconnect event
	onDisconnect = twitchChatClient.onDisconnect(() =>
		emit('onChatDisconnection')
	);

	// message event
	onMessage = twitchChatClient.onMessage(
		async (
			_channel: string,
			_user: string,
			text: string,
			msg: ChatMessage
		) => {
			// // max messages (remove oldest message)
			// if (messages.value.length >= maxChatMessages.value)
			// 	messages.value.shift();

			// add new message to list
			messages.value.push({ meta: msg, content: text });

			// scroll to bottom
			if (isChatAnchored.value === true) {
				await nextTick();
				scrollToBottom();
			}
		}
	);

	// get stream data (async)
	$fetch('/api/v1/twitch/stream', {
		params: {
			id: props.user.id,
		},
	}).then((response) => {
		// store stream data
		// if (response.data) stream.value = response.data;
	});

	// get channel badge data (async)
	$fetch('/api/v1/twitch/badges', {
		params: {
			id: props.user.id,
		},
	}).then((response) => {
		// merge and overwrite badge data
		badges.value = {
			...badges.value,
			...(response.data as IChatBadgeList),
		};
	});

	// get 7TV emotes (global and user) (async)
	const mergeEmotes = (
		globalEmotes: I7TVEmoteSet | null,
		userEmoteSet: I7TVEmoteSet | null
	) => {
		if (!globalEmotes && !userEmoteSet) return;

		// if only one is available, use it directly
		if (!globalEmotes && userEmoteSet) {
			emotes7TV.value = userEmoteSet;
			return;
		}
		if (globalEmotes && !userEmoteSet) {
			emotes7TV.value = globalEmotes;
			return;
		}

		// merge both: create a map to avoid duplicates (user emotes override global ones)
		const emoteMap = new Map<string, I7TVEmote>();

		// add global emotes first
		if (globalEmotes?.emotes) {
			globalEmotes.emotes.forEach((emote) => {
				emoteMap.set(emote.name, emote);
			});
		}

		// add/override with user emotes
		if (userEmoteSet?.emotes) {
			userEmoteSet.emotes.forEach((emote) => {
				emoteMap.set(emote.name, emote);
			});
		}

		// create merged emote set
		emotes7TV.value = {
			id: userEmoteSet?.id || globalEmotes?.id || '',
			name: userEmoteSet?.name || globalEmotes?.name || 'Merged Emotes',
			flags: userEmoteSet?.flags || globalEmotes?.flags || 0,
			tags: [
				...(userEmoteSet?.tags || []),
				...(globalEmotes?.tags || []),
			],
			immutable:
				userEmoteSet?.immutable || globalEmotes?.immutable || false,
			privileged:
				userEmoteSet?.privileged || globalEmotes?.privileged || false,
			emotes: Array.from(emoteMap.values()),
			emote_count: emoteMap.size,
			capacity: userEmoteSet?.capacity || globalEmotes?.capacity || 0,
			owner: userEmoteSet?.owner || globalEmotes?.owner,
		};
	};

	// fetch both in parallel
	Promise.allSettled([
		$fetch<{ data: I7TVEmoteSet }>(
			'/api/v1/twitch/emotes-7tv-global'
		).catch((error) => {
			console.warn('Failed to fetch 7TV global emotes:', error);
			return null;
		}),
		$fetch<{ data: I7TVUserResponse }>('/api/v1/twitch/emotes-7tv', {
			params: { id: props.user.id },
		}).catch((error) => {
			console.warn('Failed to fetch 7TV user emotes:', error);
			return null;
		}),
	]).then(([globalResult, userResult]) => {
		const globalEmotes =
			globalResult.status === 'fulfilled' && globalResult.value
				? globalResult.value.data
				: null;
		const userEmoteSet =
			userResult.status === 'fulfilled' && userResult.value
				? userResult.value.data?.emote_set || null
				: null;

		mergeEmotes(globalEmotes, userEmoteSet);
	});
});
</script>

<template>
	<!-- Chat -->
	<div
		class="w-full h-full flex flex-col overflow-y-scroll"
		ref="chatRef"
		@scroll="onChatScroll"
	>
		<!-- Spacer -->
		<span class="h-full" />

		<!-- Messages -->
		<template v-for="(message, index) of messages">
			<MessageContainer
				v-if="index >= Math.max(messages.length - maxChatMessages, 0)"
				:key="index"
				:message="message"
				:index="index"
				:badgeList="badges"
				:emotes7TV="emotes7TV"
			/>
		</template>
	</div>

	<!-- Chat Overlay -->
	<div
		class="absolute w-full h-full bottom-0 overlay-layer pointer-events-none"
	>
		<!-- Buttons -->
		<div class="w-full h-full flex justify-end items-end pr-5 pb-5">
			<!-- Scroll to Bottom -->
			<Button
				v-if="!isChatAnchored"
				:label="localize('chat.overlay.scroll_to_bottom_button')"
				@click="scrollToBottom"
				icon="i-material-symbols-arrow-circle-down-outline"
				class="opacity-50 pointer-events-auto"
				size="xl"
			/>
		</div>
	</div>
</template>
