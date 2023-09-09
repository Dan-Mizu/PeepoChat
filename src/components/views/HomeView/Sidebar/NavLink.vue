<script setup lang="ts">
import type { Component } from "vue";

const props = defineProps<{
	icon: Component;
	title: string;
	background?: boolean;
	notifications?: boolean;
	active?: boolean;
}>();
</script>

<template>
	<div class="mb-6 text-center">
		<button
			v-bind:class="{
				'bg-light-tertiary dark:bg-dark-tertiary rounded-[4px] p-2 transition duration-500':
					props.background,
			}"
			class="group relative focus:outline-none hover:scale-105"
			:title="props.title"
			:aria-label="
				props.notifications
					? props.title +
					  ' ' +
					  props.notifications +
					  ' new notifications'
					: props.title
			"
		>
			<!--icon-->
			<component
				v-if="!props.background"
				:is="props.icon"
				class="text-light-tertiary dark:text-dark-tertiary w-6 h-6 transition duration-500"
			/>
			<component
				v-else-if="props.background"
				:is="props.icon"
				class="text-light-primary dark:text-dark-primary w-6 h-6 transition duration-500"
			/>

			<!--notification -->
			<div
				v-if="props.notifications"
				class="absolute top-[-4px] left-[-4px] w-4 h-4 flex items-center justify-center bg-light-accent dark:bg-dark-accent text-xs text-light-text dark:text-dark-text outline outline-3 outline-light-secondary dark:outline-dark-secondary rounded-full transition-all duration-500"
			></div>
		</button>
	</div>
</template>
