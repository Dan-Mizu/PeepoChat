<script setup lang="ts">
import Spinner from "src/components/ui/utils/Spinner.vue";
</script>

<template>
	<div
		class="xs:absolute xs:z-10 md:static flex justify-center items-center w-full h-full"
	>
		<div role="status">
			<Spinner />
		</div>
	</div>
</template>
