<script setup lang=ts>
// localization
const localize = useI18n().t;

// run when component mounts
onMounted(async () => {
	// set title
	useHead({
		title: localize("title")
	})
});
</script>

<template>
	<div class="h-full flex flex-col scrollbar-hidden">
		<!-- spinner -->
		<div
			ref="container"
			role="status"
			class="grow px-5 py-5 flex flex-col overflow-y-scroll scrollbar-hidden justify-center items-center"
		>
			<Spinner />
		</div>

		<!-- standard footer -->
		<SidebarFooter />
	</div>
</template>
