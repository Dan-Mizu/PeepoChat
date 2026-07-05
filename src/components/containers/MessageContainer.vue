<script setup lang="ts">
// types
import type { ChatMessage } from '@twurple/chat';

// get properties
const props = defineProps<{
	message: {
		meta: ChatMessage;
		content: string;
	};
	index: number;
	badgeList: IChatBadgeList;
	emotes7TV?: I7TVEmoteSet | null;
}>();

// format badges
let badges: { [key: string]: number } = {};
if (props.message.meta.tags.get('badges'))
	(props.message.meta.tags.get('badges') as string)
		.split(',')
		.forEach((value) => {
			const badgeDataSplit = value.split('/') as string[];
			if (props.badgeList[badgeDataSplit[0]][badgeDataSplit[1]])
				badges[badgeDataSplit[0]] = Number(badgeDataSplit[1]);
		});

// get twitch emotes used in message
let emotesUsed: { [key: string]: number[][] } = {};
let emotesRaw = props.message.meta.tags.get('emotes');
if (emotesRaw && emotesRaw !== '')
	emotesRaw.split('/').forEach((emote) => {
		const emoteSplit = emote.split(':');
		emotesUsed[emoteSplit[0]] = emoteSplit[1]
			.split(',')
			.map((emoteLocation) => {
				return emoteLocation.split('-').map((emotePosition) => {
					return Number(emotePosition);
				});
			});
	});

// 7TV emote Name map (name -> emote data)
const emotes7TVMap: Map<string, I7TVEmote> = new Map();

if (props.emotes7TV?.emotes) {
	props.emotes7TV.emotes.forEach((emote) => {
		emotes7TVMap.set(emote.name, emote);
	});
}

// parse message
let message: { [key: string]: IMessageNode } = {};

// split message into individual words with the key of their starting position in the message
let position = 0;
props.message.content.split(' ').forEach((words) => {
	const node: IMessageTextNode = { type: 'text', content: words };
	message[position] = node;
	position += words.length + 1;
});

// replace Twitch emotes in message (these take priority)
for (const id in emotesUsed) {
	for (const positions of emotesUsed[id]) {
		const original = message[positions[0]] as IMessageTextNode | undefined;
		const name = original?.type === 'text' ? original.content : '';
		const emoteNode: IMessageEmoteNode = {
			type: 'emote',
			id,
			name,
			source: 'twitch',
		};
		message[positions[0]] = emoteNode;
	}
}

// replace 7TV emotes in message (only if not already replaced by Twitch emote)
if (emotes7TVMap.size > 0) {
	for (const key in message) {
		const word = message[key];
		if (word.type === 'text') {
			const emote7TV = emotes7TVMap.get(word.content);
			if (emote7TV) {
				// 7TV marks zero-width emotes with bit 256 on the emote data flags
				const flags = emote7TV.data?.flags ?? emote7TV.flags ?? 0;
				const isZeroWidth = (flags & 256) === 256;
				const emoteNode: IMessageEmoteNode = {
					type: 'emote',
					id: emote7TV.id,
					name: emote7TV.name,
					source: '7tv',
					isZeroWidth,
				};
				message[key] = emoteNode;
			}
		}
	}
}

// group 0-width emotes with their previous non-zero-width emote
const messagePositions = Object.keys(message)
	.map(Number)
	.sort((a, b) => a - b);

	for (let i = 0; i < messagePositions.length; i++) {
		const currentPos = messagePositions[i];
		const currentWord = message[currentPos];

		// skip if missing or not a zero-width emote
		if (
			!currentWord ||
			currentWord.type !== 'emote' ||
			!currentWord.isZeroWidth
		)
			continue;

		// look backwards for the previous non-zero-width emote
		for (let j = i - 1; j >= 0; j--) {
			const prevPos = messagePositions[j];
			const prevWord = message[prevPos];

			if (!prevWord || prevWord.type !== 'emote') continue;

			if (!prevWord.isZeroWidth) {
				// attach this 0-width emote to the previous emote
				if (!prevWord.zeroWidthEmotes) {
					prevWord.zeroWidthEmotes = [];
				}
				prevWord.zeroWidthEmotes.push({
					id: currentWord.id,
					name: currentWord.name,
					source: currentWord.source,
				});

				// mark this position to be skipped in rendering
				delete message[currentPos];
				break;
			}
		}
	}

// SECOND PASS: group runs of only-zero-width emotes together
const sortedPositions = Object.keys(message)
	.map(Number)
	.sort((a, b) => a - b);

let runStartIndex = 0;

while (runStartIndex < sortedPositions.length) {
	const startPos = sortedPositions[runStartIndex];
	const startWord = message[startPos];

	// only care about zero-width emotes still present
	if (!startWord || startWord.type !== 'emote' || !startWord.isZeroWidth) {
		runStartIndex++;
		continue;
	}

	// collect a run of consecutive zero-width emotes
	let runEndIndex = runStartIndex + 1;
	const runPositions: number[] = [startPos];

	while (runEndIndex < sortedPositions.length) {
		const pos = sortedPositions[runEndIndex];
		const word = message[pos];

		if (!word || word.type !== 'emote' || !word.isZeroWidth) break;

		runPositions.push(pos);
		runEndIndex++;
	}

	// if we have more than one zero-width in a row, group them
	if (runPositions.length > 1) {
		const basePos = runPositions[0];
		const baseWord = message[basePos];

		if (baseWord && baseWord.type === 'emote') {
			if (!baseWord.zeroWidthEmotes) {
				baseWord.zeroWidthEmotes = [];
			}

			for (let i = 1; i < runPositions.length; i++) {
				const pos = runPositions[i];
				const word = message[pos];

				if (word && word.type === 'emote') {
					baseWord.zeroWidthEmotes.push({
						id: word.id,
						name: word.name,
						source: word.source,
					});
					delete message[pos];
				}
			}
		}
	}

	runStartIndex = runEndIndex;
}

// if no emotes were found, simplify the message structure
if (Object.values(message).every((word) => word.type === 'text')) {
	const single: { [key: string]: IMessageNode } = {
		'0': { type: 'text', content: props.message.content },
	};
	message = single;
}

// build a stack (base + its zero-widths) for a given emote node
const buildStackForWord = (word: IMessageEmoteNode): IEmoteStack[] => {
	const base: IEmoteStack = {
		id: word.id,
		name: word.name,
		source: word.source,
		isBase: true,
		isZeroWidth: !!word.isZeroWidth,
	};

	const zeros: IEmoteStack[] = (word.zeroWidthEmotes ?? []).map((zw) => ({
		id: zw.id,
		name: zw.name,
		source: zw.source,
		isBase: false,
		isZeroWidth: true,
	}));

	// order: base first, then zero-widths in the order they were attached
	return [base, ...zeros];
};

const messageEntries = computed<IMessageEntry[]>(() => {
	const positions = Object.keys(message)
		.map(Number)
		.sort((a, b) => a - b);

	return positions.map((pos) => {
		const node = message[pos];
		if (node.type === 'emote') {
			const stack = buildStackForWord(node);
			return { position: pos, node, stack };
		}
		return { position: pos, node };
	});
});

// get URLs in message
// let urls: string[] = [];
// let message = URI.withinString(props.message.content, (url) => {
// 	// save link
// 	urls.push(url);

// 	// remove link from message content
// 	return '';
// });
</script>

<template>
	<div
		:class="[
			// first message: highlight background
			props.message.meta.tags.get('first-msg') == '1'
				? 'bg-yellow-50 dark:bg-stone-700'
				: // alternate background color of messages
				index % 2 === 0
				? 'bg-secondary-color'
				: // empty/transparent (inherit background)
				  '',
			'pl-5 py-1 break-words',
		]"
	>
		<!-- Debug: Click chat message to print message object in browser log -->
		<a href="#" @click.prevent="console.log(props.message.meta.tags)">
			<!-- Badges -->
			<ChatBadge
				v-if="badges"
				v-for="(version, id) in badges"
				:key="id"
				:title="props.badgeList[id][version].title"
				:url="props.badgeList[id][version].url"
				:preview-url="props.badgeList[id][version].previewUrl"
				class="inline-block align-bottom pb-1"
			/>

			<!-- Name -->
			<span
				:style="{
					color: props.message.meta.tags.get('color')
						? props.message.meta.tags.get('color')
						: '#b9b9b9',
				}"
				class="dark:mix-blend-plus-lighter"
			>
				{{ props.message.meta.tags.get('display-name') }}:
			</span>

			<!-- Message Content -->
			<span class="pl-1 break-words" style="word-break: break-word; overflow-wrap: anywhere;">
				<template
					v-for="(entry, index) in messageEntries"
					:key="entry.position"
				>
					<!-- Leading space before every entry except the first.
					     Uses {{ ' ' }} (not a literal space) so Vue's whitespace
					     condensing can't drop it — this keeps word spacing intact and
					     preserves wrap points when a message contains emotes. -->
					<span v-if="index > 0">{{ ' ' }}</span>

					<!-- Text -->
					<span v-if="entry.node.type === 'text'" class="inline">
						{{ entry.node.content }}
					</span>

					<!-- Emote (normal or stacked) -->
					<span
						v-else
						class="inline relative align-bottom leading-none"
						style="overflow: visible"
					>
						<EmoteStack
							v-if="entry.stack && entry.stack.length > 1"
							:stack="entry.stack"
						/>
						<Emote
							v-else
							:id="(entry.node as IMessageEmoteNode).id"
							:name="(entry.node as IMessageEmoteNode).name"
							:source="(entry.node as IMessageEmoteNode).source"
						/>
					</span>

					<!-- Link -->
					<!-- <p class="inline">
						{{ props.message.content }}
						<template v-for="url of urls">
							<NuxtLink :href="url" target="_blank">
								<div
									class="w-[200px] h-[20px] bg-blue-600 bg-opacity-35 rounded flex items-center overflow-hidden pl-3"
								>
									<p class="text-nowrap whitespace-nowrap">
										<Icon
											name="material-symbols:link-rounded"
											class="w-[20px] h-[20px] text-white"
										/>
										{{ url }}
									</p>
								</div>
							</NuxtLink>
						</template>
					</p> -->
				</template>
			</span>
		</a>
	</div>
</template>
