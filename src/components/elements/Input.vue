<script setup lang="ts">
// localization
const localize = useI18n().t;

const props = withDefaults(
	defineProps<{
		icon?: string;
		placeholder?: string;
		loading?: boolean;
		loadingPlaceholder?: string;
	}>(),
	{
		loading: false,
	}
);

// input
const q = ref("");
</script>

<template>
	<UInput
		v-model="q"
		name="q"
		autocomplete="off"
		:placeholder="
			props.loading
				? props.loadingPlaceholder
					? props.loadingPlaceholder
					: localize('generic.input.placeholder_searching')
				: props.placeholder
				? props.placeholder
				: localize('generic.input.placeholder')
		"
		:icon="props.icon ? props.icon : 'i-tabler-search'"
		:loading="props.loading"
		loading-icon="i-tabler-loader-2"
		size="xl"
		:ui="{
			leading: {
				padding: {
					'2xs': 'ps-6',
					xs: 'ps-7',
					sm: 'ps-7',
					md: 'ps-7',
					lg: 'ps-8',
					xl: 'ps-9',
				},
			},
			color: {
				white: {
					outline:
						'shadow-sm bg-light-secondary dark:bg-dark-secondary text-light-text dark:text-dark-text ring-0 focus:ring-0',
				},
			},
			placeholder:
				'placeholder-light-text-placeholder dark:placeholder-dark-text-placeholder',
			icon: {
				base: 'flex-shrink-0 text-light-text-placeholder dark:text-dark-text-placeholder',
				trailing: { pointer: '' },
			},
		}"
	>
		<!-- Remove Current Input Button -->
		<template #trailing>
			<IconButton
				v-show="q !== ''"
				icon="i-heroicons-x-mark-20-solid"
				roundedType="medium"
				size="sm"
				:click-callback="() => (q = '')"
			/>
		</template>
	</UInput>
</template>
