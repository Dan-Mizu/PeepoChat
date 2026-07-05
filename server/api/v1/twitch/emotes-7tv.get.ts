import type { ApiClient } from '@twurple/api';

export default defineEventHandler(async (event) => {
	// get query params
	const { id, name } = getQuery(event);

	// get twitch api (twurple) client
	const twitchAPI: ApiClient = event.context.twitchAPI;

	// failed to connect
	if (!twitchAPI)
		throw createError({
			statusCode: 500,
			statusMessage: 'Internal Server Error',
			data: 'Unable to reach Twitch API.',
		});

	// get user by ID or name
	let user;
	if (id) {
		user = await twitchAPI.users.getUserById(Number(id));
	} else if (name) {
		user = await twitchAPI.users.getUserByName(name as string);
	} else {
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			data: 'Either id or name parameter is required.',
		});
	}

	// user not found
	if (!user) {
		throw createError({
			statusCode: 404,
			statusMessage: 'Not Found',
			data: 'Channel not found.',
		});
	}

	// fetch 7TV emotes
	try {
		const response = await fetch(
			`https://7tv.io/v3/users/twitch/${user.id}`
		);

		if (!response.ok) {
			throw createError({
				statusCode: response.status,
				statusMessage: '7TV API Error',
				data: `7TV API returned status ${response.status}`,
			});
		}

		const data = await response.json();
		return { data };
	} catch (error: any) {
		// if it's already a createError, re-throw it
		if (error.statusCode) throw error;

		// otherwise, wrap it in a generic error
		throw createError({
			statusCode: 500,
			statusMessage: 'Internal Server Error',
			data: 'Failed to fetch 7TV emotes.',
		});
	}
});

