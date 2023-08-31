<script setup lang="ts">
import { IconChevronsLeft, IconChevronsRight } from "@tabler/icons-vue";
import IconButton from "src/components/ui/inputs/IconButton.vue";
import useStore from "src/store/store";
import Lang from "src/assets/lang/en_us.json";

const store = useStore();

// toggle sidebar
const toggleSidebar = () => {
	store.settings.showSidebar = !store.settings.showSidebar;
};
</script>

<template>
	<IconButton
		class="group w-7 h-7 hover:bg-light-secondary dark:hover:bg-dark-secondary transition-all duration-500"
		variant="ghost"
		:title="Lang.chatFooter.chatBox.sendMessage"
		:aria-label="Lang.chatFooter.chatBox.sendMessage"
		@click="toggleSidebar()"
	>
		<IconChevronsLeft
			v-if="store.settings.showSidebar"
			class="w-[17px] h-[17px] text-light-tertiary dark:text-dark-tertiary"
		/>
		<IconChevronsRight
			v-else
			class="w-[17px] h-[17px] text-light-tertiary dark:text-dark-tertiary"
		/>
	</IconButton>
</template>
