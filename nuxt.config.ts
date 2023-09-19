// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	ssr: false,
	devServer: {
		port: 5500,
	},
	srcDir: "src",
	devtools: { enabled: true },
	colorMode: {
		classSuffix: "",
	},
	modules: [
		"@pinia/nuxt",
		"@vueuse/nuxt",
		"@nuxt/ui", // includes @nuxtjs/tailwindcss & @nuxtjs/color-mode
		"nuxt-icon",
		"@nuxtjs/i18n",
	],
	components: [
		{
			path: "~/components", // will get any components nested in let's say /components/test too
			pathPrefix: false,
		},
	],
	ui: {
		icons: ["tabler", "fluent", "ri"],
	},
	i18n: {
		vueI18n: "./src/assets/lang.ts",
	},
});
