<script setup lang="ts">
// localization
const localize = useI18n().t;
</script>

<template>
	<EmptyStateView
		:title="localize('title')"
		icon="i-tabler-message-circle-2"
		:header="localize('view.no_channel_selected.header')"
		:description="localize('view.no_channel_selected.description')"
	/>
</template>
