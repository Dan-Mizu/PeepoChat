<script setup lang="ts">
import { onMounted } from "vue";
import Typography from "src/components/ui/data-display/Typography.vue";
import SidebarButton from "src/components/ui/inputs/SidebarButton.vue";

import { IconMessageCircle2 } from "@tabler/icons-vue";

import { setTitle } from "src/utils";
import Lang from "src/assets/lang/en_us.json";

onMounted(() => {
	// set title
	setTitle();
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
				<IconMessageCircle2
					class="w-7 h-7 text-light-text dark:text-dark-text"
				/>
			</div>

			<Typography variant="heading-2" class="mb-3">
				{{ Lang.noChannelSelected.title }}
			</Typography>

			<Typography variant="body-2" class="flex">
				{{ Lang.noChannelSelected.description }}
			</Typography>
		</div>

		<!-- sidebar button -->
		<div class="p-4 flex">
			<div class="mr-5 self-center relative">
				<SidebarButton></SidebarButton>
			</div>
		</div>
	</div>
</template>
