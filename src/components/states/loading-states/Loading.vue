<script setup lang="ts">
import Spinner from "src/components/ui/utils/Spinner.vue";
import StandardFooter from "src/components/ui/utils/StandardFooter.vue";
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
		<StandardFooter />
	</div>
</template>
