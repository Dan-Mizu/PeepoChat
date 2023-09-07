<script setup lang="ts">
import Modal from "src/components/ui/utils/Modal.vue";
import Button from "src/components/ui/inputs/Button.vue";
import TextInput from "src/components/ui/inputs/TextInput.vue";

import {
	IconBrandTwitch,
	IconBrandYoutubeFilled,
	IconBrandKick,
} from "@tabler/icons-vue";

import { toast } from "src/utils";
import Lang from "src/assets/lang/en_us.json";

const props = defineProps<{
	open: boolean;
	closeModal: () => void;
}>();
</script>

<template>
	<Modal :open="props.open" :close-modal="props.closeModal">
		<template v-slot:content>
			<div
				class="w-[400px] bg-dark-primary dark:bg-dark-primary rounded py-6"
			>
				<!-- platform tabs -->
				<span class="flex items-center justify-center">
					<button
						class="bg-twitch-background text-twitch-icon px-3 py-2 rounded-md flex hover:scale-105 transition-all duration-500 mr-4"
					>
						<IconBrandTwitch class="mr-2" />
						<span class="font-bold">{{
							Lang.addChannelModal.channelTab.twitch
						}}</span>
					</button>
					<button
						class="bg-youtube-background text-youtube-icon px-3 py-2 rounded-md flex transition-all duration-500 mr-4 opacity-20"
						@click="toast.error(Lang.error.unimplemented)"
					>
						<IconBrandYoutubeFilled class="mr-2" />
						<span class="font-bold">{{
							Lang.addChannelModal.channelTab.youtube
						}}</span>
					</button>
					<button
						class="bg-kick-background text-kick-icon px-3 py-2 rounded-md flex transition-all duration-500 opacity-20"
						@click="toast.error(Lang.error.unimplemented)"
					>
						<IconBrandKick class="mr-2 fill-current" />
						<span class="font-bold">{{
							Lang.addChannelModal.channelTab.kick
						}}</span>
					</button>
				</span>

				<!-- channel name -->
				<div class="px-5 py-6">
					<TextInput
						:placeholder="Lang.addChannelModal.typeChannelName"
						type="text"
					/>
				</div>

				<!-- options -->

				<!-- action buttons -->
				<div class="flex w-full px-5">
					<div class="grow flex justify-start">
						<Button
							variant="ghost"
							@click="props.closeModal"
							class="mr-4"
						>
							{{ Lang.addChannelModal.cancel }}
						</Button>
					</div>

					<Button @click="toast.error(Lang.error.unimplemented)">
						{{ Lang.addChannelModal.addChannel }}
					</Button>
				</div>
			</div>
		</template>
	</Modal>
</template>
