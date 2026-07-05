<script setup lang="ts">
const props = defineProps<{
	icon: string;
	header: string;
	description: string;
}>();
</script>

<template>
	<div class="h-full w-full flex">
		<!-- Alert -->
		<div class="grow flex flex-col full-center">
			<div
				class="w-10 h-10 mb-5 rounded-full bg-secondary-color flex full-center"
			>
				<Icon :name="props.icon" class="w-7 h-7" />
			</div>

			<h1 class="font-bold">
				{{ props.header }}
			</h1>

			<p class="flex opacity-80">
				{{ props.description }}
			</p>
		</div>
	</div>
</template>
