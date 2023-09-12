import en from "~/assets/lang/en.json";

export default defineI18nConfig(() => ({
	legacy: false,
	locale: "en",
	defaultLocale: "en",
	messages: {
		en,
	},
}));
