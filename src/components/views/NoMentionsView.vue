<script setup lang="ts">
// localization
const localize = useI18n().t;
</script>

<template>
	<EmptyStateView
		:title="
			localize('title') +
			' | ' +
			localize('view.no_mentions.title')
		"
		icon="i-tabler-at"
		:header="localize('view.no_mentions.header')"
		:description="localize('view.no_mentions.description')"
	/>
</template>
