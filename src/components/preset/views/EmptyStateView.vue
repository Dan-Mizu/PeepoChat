<script setup lang="ts">
const props = defineProps<{
    title: string;
    icon: string;
    header: string;
    description: string;
}>();

// run when component mounts
onMounted(async () => {
	// set title
	useHead({
		title: props.title
	})
});
</script>

<template>
	<div class="h-full flex flex-col">
		<!-- Alert -->
		<div
			ref="container"
			class="grow flex flex-col justify-center items-center"
		>
			<div
				class="w-10 h-10 mb-5 rounded-full bg-light-secondary dark:bg-dark-secondary flex justify-center items-center"
			>
				<Icon
					:name="props.icon"
					class="w-7 h-7 text-light-text dark:text-dark-text"
				/>
			</div>

			<h1 class="font-bold">
				{{ props.header }}
			</h1>

			<p class="flex opacity-80">
				{{ props.description }}
			</p>
		</div>

		<!-- standard footer -->
		<SidebarFooter />
	</div>
</template>
