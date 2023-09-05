<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";

import IconButton from "src/components/ui/inputs/IconButton.vue";
import ScaleTransition from "src/components/ui/transitions/ScaleTransition.vue";
import EmojiPicker from "src/components/ui/inputs/EmojiPicker/EmojiPicker.vue";
import SidebarButton from "src/components/ui/inputs/SidebarButton.vue";
import Textarea from "src/components/ui/inputs/Textarea.vue";

import useStore from "src/store/store";

import {
	IconMoodSmileBeam,
	IconSend,
	// IconPaperclip,
	IconCircleX,
} from "@tabler/icons-vue";
import { toast } from "src/utils";
import Lang from "src/assets/lang/en_us.json";

const store = useStore();

// the content of the message.
const value: Ref<string> = ref("");

// open emoji picker.
const showPicker = ref(false);

// // open modal used to send multiple attachments attachments.
// const openAttachmentsModal = ref(false);

// close picker when you click outside.
const handleClickOutside = (event: Event) => {
	let target = event.target as HTMLElement;
	let parent = target.parentElement as HTMLElement;

	if (
		target &&
		!target.classList.contains("toggle-picker-button") &&
		parent &&
		!parent.classList.contains("toggle-picker-button")
	) {
		showPicker.value = false;
	}
};
</script>

<template>
	<!-- Footer -->
	<div v-if="store.status !== 'loading'" class="p-4 flex">
		<!-- sidebar button -->
		<div class="mr-5 self-center relative">
			<SidebarButton></SidebarButton>
		</div>

		<!-- Chat Box-->
		<div v-if="store.user.id" class="grow mr-5 self-end relative">
			<!-- Text Input -->
			<Textarea
				v-model="value"
				:value="value"
				class="resize-none scrollbar-hidden"
				auto-resize
				cols="30"
				rows="1"
				:placeholder="Lang.chatFooter.chatBox.placeholder"
				:aria-label="Lang.chatFooter.chatBox.placeholder"
			/>

			<!-- Buttons -->
			<div
				class="absolute flex h-full right-0 top-0 m-auto items-center mr-3"
			>
				<!-- attachments -->
				<!-- <IconButton
					:title="Lang.chatFooter.chatBox.openAttachmentsModal"
					:aria-label="Lang.chatFooter.chatBox.openAttachmentsModal"
					@click="openAttachmentsModal = true"
					class="group w-7 h-7"
				>
					<IconPaperclip
						class="w-[20px] h-[20px] text-light-tertiary dark:text-dark-tertiary group-hover:text-light-accent dark:group-hover:text-dark-accent transition-all duration-500"
					/>
				</IconButton> -->

				<!--emoji button-->
				<IconButton
					:title="Lang.chatFooter.chatBox.openEmojiPicker"
					:aria-label="Lang.chatFooter.chatBox.openEmojiPicker"
					@click="showPicker = !showPicker"
					class="toggle-picker-button group w-7 h-7"
				>
					<IconCircleX
						v-if="showPicker"
						class="w-[20px] h-[20px] text-light-tertiary dark:text-dark-tertiary group-hover:text-light-accent dark:group-hover:text-dark-accent transition-all duration-500"
					/>
					<IconMoodSmileBeam
						v-else
						class="w-[20px] h-[20px] text-light-tertiary dark:text-dark-tertiary group-hover:text-light-accent dark:group-hover:text-dark-accent transition-all duration-500"
					/>
				</IconButton>

				<!--emoji picker-->
				<ScaleTransition>
					<div
						v-click-outside="handleClickOutside"
						v-show="showPicker"
						class="absolute z-10 bottom-[55px] right-0 mt-2"
					>
						<div role="none">
							<EmojiPicker :show="showPicker" />
						</div>
					</div>
				</ScaleTransition>
			</div>
		</div>
		<div v-else-if="!store.user.id" class="grow mr-5 self-end relative">
			<div
				class="resize-none max-w-full w-full px-5 py-4 rounded-sm content-center text-sm outline-none text-light-text-placeholder dark:text-dark-text-placeholder bg-light-secondary dark:bg-dark-secondary transition-all duration-500 text-center select-none"
			>
				{{ Lang.chatFooter.notAuthenticated.description }}
			</div>
		</div>

		<!-- send message button -->
		<div v-if="store.user.id" class="xs:mr-5 md:mr-0 self-center relative">
			<IconButton
				class="group w-7 h-7 bg-light-accent dark:bg-dark-accent transition-all duration-500"
				variant="ghost"
				:title="Lang.chatFooter.chatBox.sendMessage"
				:aria-label="Lang.chatFooter.chatBox.sendMessage"
				@click="toast.error(Lang.error.unimplemented)"
			>
				<IconSend class="w-[17px] h-[17px] text-white" />
			</IconButton>
		</div>
	</div>

	<!-- <AttachmentsModal
		:open="openAttachmentsModal"
		:close-modal="() => (openAttachmentsModal = false)"
	/> -->
</template>

<style>
input[placeholder="Search emoji"] {
	background: rgba(0, 0, 0, 0);
}

.v3-emoji-picker .v3-header {
	border-bottom: 0;
}

.v3-emoji-picker .v3-footer {
	border-top: 0;
}
</style>
