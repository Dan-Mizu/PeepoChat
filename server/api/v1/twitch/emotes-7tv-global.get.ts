export default defineEventHandler(async (event) => {
	// fetch 7TV global emotes
	try {
		const response = await fetch('https://7tv.io/v3/emote-sets/global');

		if (!response.ok) {
			throw createError({
				statusCode: response.status,
				statusMessage: '7TV API Error',
				data: `7TV API returned status ${response.status}`,
			});
		}

		const data = await response.json();
		// The global API returns the emote set directly (not wrapped in emote_set)
		// So we return it as is, which matches I7TVEmoteSet structure
		return { data };
	} catch (error: any) {
		// if it's already a createError, re-throw it
		if (error.statusCode) throw error;

		// otherwise, wrap it in a generic error
		throw createError({
			statusCode: 500,
			statusMessage: 'Internal Server Error',
			data: 'Failed to fetch 7TV global emotes.',
		});
	}
});


