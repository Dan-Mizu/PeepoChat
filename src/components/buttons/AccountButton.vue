<script setup lang="ts">
// localization
const localize = useI18n().t;

// dropdown contents when user is authenticated
const dropdownContentAuth = [
	[
		[
			{
				label: '', // TODO: Display currently signed in user info.
				slot: 'account',
				disabled: true,
			},
		],
		[
			{
				label: localize('sidebar.account.dropdown.settings'),
				icon: 'i-heroicons-cog-8-tooth',
			},
		],
		[
			{
				label: localize('sidebar.account.dropdown.sign_out'),
				icon: 'i-heroicons-arrow-right-on-rectangle',
			},
		],
	],
];

// dropdown contents when in anonymous mode
const dropdownContentAnon = [
	[
		{
			label: localize('sidebar.account.dropdown.sign_in'),
			icon: 'i-heroicons-arrow-left-on-rectangle',
		},
	],
	[
		{
			label: localize('sidebar.account.dropdown.settings'),
			icon: 'i-heroicons-cog-8-tooth',
		},
	],
];

// only one popover (menu or tooltip) is visible at a time app-wide; also
// closes when the pointer leaves the trigger/menu (with a grace period)
const {
	isOpen: dropdownOpen,
	cancelClose,
	scheduleClose,
} = useExclusiveMenu('account-menu');
</script>

<template>
	<!-- Account Settings Dropdown -->
	<UDropdown
		:items="dropdownContentAnon"
		:ui="{
			container: 'pl-2',
			ring: '',
			divide: '',
			item: {
				active: 'bg-primary-color',
				disabled: 'cursor-text select-text',
			},
			padding: 'p-1',
		}"
		:popper="{ placement: 'right' }"
		v-model:open="dropdownOpen"
		@mouseenter="cancelClose"
		@mouseleave="scheduleClose"
	>
		<!-- Button Trigger -->
		<Button :label="localize('sidebar.account.button')" variant="hidden">
			<template #content>
				<!-- Avatar Icon -->
				<UAvatar
					src="/img/anon.png"
					:ui="{
						rounded: 'rounded-md',
						wrapper:
							'relative inline-flex items-center justify-center flex-shrink-0 ring-4 ring-primary',
					}"
				/>
			</template>
		</Button>

		<!-- Dropdown Items -->
		<template #item="{ item }">
			<UIcon :name="item.icon" class="h-5 w-5" />
			<span class="truncate">{{ item.label }}</span>
		</template>
	</UDropdown>
</template>
