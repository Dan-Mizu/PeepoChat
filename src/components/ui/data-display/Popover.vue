<script setup lang="ts">
import useStore from "src/store/store";
const store = useStore();

const props = defineProps<{
	class?: string;
}>();
</script>

<template>
	<VTooltip>
		<template #popper>
			<div
				:class="[
					props.class,
					!store.settings.darkMode
						? 'bg-light-secondary text-light-text'
						: 'bg-dark-secondary text-dark-text',
					'm-4 p-3 border-none rounded-md shadow opacity-100 transition-all duration-500',
				]"
			>
				<slot name="content" />
			</div>
		</template>
		<slot />
	</VTooltip>
</template>

<style>
.v-popper--theme-tooltip .v-popper__inner {
	@apply bg-transparent m-0 p-0;
}

.v-popper--theme-tooltip .v-popper__arrow-outer {
	@apply hidden;
}

.v-popper--theme-tooltip .v-popper__arrow-inner {
	@apply hidden;
}
</style>
