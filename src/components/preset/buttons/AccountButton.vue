<script setup lang="ts">
// localization
const localize = useI18n().t;

// open account view
const openAccountPage = () => {
	// TODO: Implement Account Page
};

// dropdown contents when user is authenticated
const dropdownContentAuth = [
	[
		[
			{
				label: "", // TODO: Display currently signed in user info.
				slot: "account",
				disabled: true,
			},
		],
		[
			{
				label: localize("sidebar.account.dropdown.settings"),
				icon: "i-heroicons-cog-8-tooth",
			},
		],
		[
			{
				label: localize("sidebar.account.dropdown.sign_out"),
				icon: "i-heroicons-arrow-right-on-rectangle",
			},
		],
	],
];

// dropdown contents when in anonymous mode
const dropdownContentAnon = [
	[
		{
			label: localize("sidebar.account.dropdown.settings"),
			icon: "i-heroicons-cog-8-tooth",
		},
	],
	[
		{
			label: localize("sidebar.account.dropdown.sign_in"),
			icon: "i-heroicons-arrow-left-on-rectangle",
		},
	],
];
</script>

<template>
	<Dropdown :items="dropdownContentAnon" disabled>
		<AvatarButton ring roundedType="md" :clickCallback="openAccountPage" />
	</Dropdown>
</template>
