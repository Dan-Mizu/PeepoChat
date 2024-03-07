import { name, version, author } from "./package.json";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devServer: {
		port: 5500,
	},
	srcDir: "src",
	modules: [
		"@nuxt/ui", // UI library, includes @nuxtjs/tailwindcss & @nuxtjs/color-mode
		"nuxt-icon", // icons
		"@nuxtjs/i18n", // translations
		"@pinia/nuxt", // storing state
		"@pinia-plugin-persistedstate/nuxt" // persistent state
	],
	runtimeConfig: {
		public: {
			version,
			userAgent: `${name}/${version} (${author.email})`,
		},
	},
	components: [
		{
			path: "~/components", // check for nested components
			pathPrefix: false,
		},
	],
	ui: {
		icons: ["tabler", "fluent", "ri"],
	},
	i18n: {
		vueI18n: "./src/assets/lang.ts",
	},
	colorMode: {
		classSuffix: "",
	},
	devtools: { enabled: true },
});
