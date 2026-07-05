export default function (
	id: string,
	source: EmoteSource = 'twitch',
	size: '1' | '4' = '1'
) {
	// 7tv
	if (source === '7tv')
		return `https://cdn.7tv.app/emote/${id}/${size}x.webp`;

	// Twitch
	return `https://static-cdn.jtvnw.net/emoticons/v2/${id}/default/dark/${size}.0`;
}
