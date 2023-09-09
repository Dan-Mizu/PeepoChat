<script setup lang="ts">
import useStore from "src/store/store";
const store = useStore();

const props = defineProps<{
	class?: string;
}>();
</script>

<template>
	<VTooltip theme="popover" :skidding="0">
		<template #popper>
			<div
				:class="[
					props.class,
					!store.settings.darkMode
						? 'bg-light-secondary text-light-text'
						: 'bg-dark-secondary text-dark-text',
					'p-3 rounded-md shadow transition-all duration-500',
				]"
			>
				<slot name="content" />
			</div>
		</template>
		<slot />
	</VTooltip>
</template>

<style>
.v-popper--theme-popover .v-popper__arrow-outer {
	@apply hidden;
}

.v-popper--theme-popover .v-popper__arrow-inner {
	@apply hidden;
}
</style>
