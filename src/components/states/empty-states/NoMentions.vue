<script setup lang="ts">
import { onMounted } from "vue";
import Typography from "src/components/ui/data-display/Typography.vue";
import StandardFooter from "src/components/ui/utils/StandardFooter.vue";

import { setTitle } from "src/utils";

import Lang from "src/assets/lang/en_us.json";

import { IconAt } from "@tabler/icons-vue";

onMounted(() => {
	// set title
	setTitle({ suffix: "Mentions" });
});
</script>

<template>
	<div class="h-full flex flex-col scrollbar-hidden">
		<!-- alert -->
		<div
			ref="container"
			class="grow px-5 py-5 flex flex-col overflow-y-scroll scrollbar-hidden justify-center items-center"
		>
			<div
				class="w-10 h-10 mr-4 mb-5 flex justify-center items-center rounded-full bg-light-secondary dark:bg-dark-secondary transition duration-500"
			>
				<IconAt class="w-7 h-7 text-light-text dark:text-dark-text" />
			</div>

			<Typography variant="heading-2" class="mb-3">
				{{ Lang.noMentions.title }}
			</Typography>

			<Typography variant="body-2" class="flex">
				{{ Lang.noMentions.description }}
			</Typography>
		</div>

		<!-- standard footer -->
		<StandardFooter />
	</div>
</template>
