<script setup lang="ts">
import { Ref, ref } from "vue";
import Modal from "src/components/ui/utils/Modal.vue";
import Button from "src/components/ui/inputs/Button.vue";
import TextInput from "src/components/ui/inputs/TextInput.vue";
import Spinner from "src/components/ui/utils/Spinner.vue";

import useStore from "src/store/store";
const store = useStore();

import { invoke } from "@tauri-apps/api/tauri";

import { toast } from "src/utils";
import Lang from "src/assets/lang/en_us.json";

import {
	IconBrandTwitch,
	IconBrandYoutubeFilled,
	IconBrandKick,
	IconChevronLeft,
} from "@tabler/icons-vue";

const props = defineProps<{
	open: boolean;
	closeModal: () => void;
}>();

const view: Ref<{
	state: "addChannel" | "loading" | "success";
	channelData?: {
		display_name: string;
		avatar: string;
	};
}> = ref({
	state: "addChannel",
});

const closeModalChecker = () => {
	// prevent modal closing while loading
	if (view.value.state === "loading") return;

	// close modal
	props.closeModal();

	// reset view state after 500ms (time it takes for css transition to complete)
	setTimeout(
		() =>
			(view.value = {
				state: "addChannel",
			}),
		500
	);
};

const addChannel = async (channel?: string): Promise<void> => {
	// get channel text input if not provided
	if (!channel)
		channel = (
			document.getElementById(
				"addChannelModalTextInput"
			) as HTMLInputElement
		).value;

	// loading state
	view.value.state = "loading";

	// create callbacks
	const success = (response: ITwitchUserResponse) => {
		// check if channel is already saved
		if (
			store.user.channels.find(
				(channelData) => channelData.id == response.id
			)
		) {
			// go back to addChannel state
			view.value.state = "addChannel";

			// send error
			toast.error(
				Lang.error.channelAlreadyExists.replace(
					"{0}",
					'"' + channel + '"'
				)
			);

			return;
		}

		// success state
		view.value = {
			state: "success",
			channelData: {
				display_name: response.display_name,
				avatar: response.profile_image_url,
			},
		};
	};
	const failure = (_response: any) => {
		// go back to addChannel state
		view.value.state = "addChannel";

		// send error
		toast.error(
			Lang.error.channelNotFound.replace("{0}", '"' + channel + '"')
		);
	};

	// attempt to retrieve channel
	await (
		invoke("get_twitch_user", {
			username: channel,
		}) as Promise<ITwitchUserResponse>
	)
		.then(success)
		.catch(failure);
};
</script>

<template>
	<Modal :open="props.open" :close-modal="closeModalChecker">
		<template v-slot:content>
			<div
				class="w-[400px] bg-light-primary dark:bg-dark-primary rounded py-6"
			>
				<span v-if="view.state === 'addChannel'">
					<!-- platform tabs -->
					<span class="flex items-center justify-center">
						<button
							class="bg-twitch-background text-twitch-icon px-3 py-2 rounded-md flex select hover:scale-105 transition-all duration-500 mr-4"
						>
							<IconBrandTwitch class="mr-2" />
							<span class="font-bold select-none">{{
								Lang.addChannelModal.channelTab.twitch
							}}</span>
						</button>
						<button
							class="bg-youtube-background text-youtube-icon px-3 py-2 rounded-md flex transition-all duration-500 mr-4 opacity-20"
							@click="toast.error(Lang.error.unimplemented)"
						>
							<IconBrandYoutubeFilled class="mr-2" />
							<span class="font-bold select-none">{{
								Lang.addChannelModal.channelTab.youtube
							}}</span>
						</button>
						<button
							class="bg-kick-background text-kick-icon px-3 py-2 rounded-md flex transition-all duration-500 opacity-20"
							@click="toast.error(Lang.error.unimplemented)"
						>
							<IconBrandKick class="mr-2 fill-current" />
							<span class="font-bold select-none">{{
								Lang.addChannelModal.channelTab.kick
							}}</span>
						</button>
					</span>

					<!-- channel name -->
					<div class="px-5 py-6">
						<TextInput
							:placeholder="Lang.addChannelModal.typeChannelName"
							id="addChannelModalTextInput"
							type="text"
							:onSubmit="addChannel"
							:clear-on-submit="false"
						/>
					</div>

					<!-- options -->

					<!-- action buttons -->
					<div class="flex w-full px-5">
						<!-- cancel -->
						<div class="grow flex justify-start">
							<Button
								variant="ghost"
								@click="closeModalChecker"
								class="mr-4"
							>
								{{ Lang.addChannelModal.cancel }}
							</Button>
						</div>

						<!-- submit -->
						<Button @click="() => addChannel()">
							{{ Lang.addChannelModal.addChannel }}
						</Button>
					</div>
				</span>
				<span
					v-else-if="view.state === 'loading'"
					class="flex h-36 justify-center items-center"
				>
					<Spinner />
				</span>
				<span v-else-if="view.state === 'success'">
					<!-- go back -->
					<Button
						variant="ghost"
						@click="
							() => {
								view = { state: 'addChannel' };
							}
						"
						class="mx-4"
					>
						<IconChevronLeft
							class="text-light-text dark:text-dark-text"
						/>
					</Button>

					<!-- channel info -->
					<span class="flex items-center justify-center mb-8 mt-4">
						<!-- channel icon -->
						<div class="bg-white rounded-full flex relative">
							<!-- avatar -->
							<div
								id="channel-avatar"
								:style="{
									backgroundImage: `url(${view.channelData?.avatar})`,
								}"
								class="w-[55px] h-[55px] rounded-full bg-cover bg-center"
							></div>

							<!-- platform -->
							<div
								class="absolute right-0 flex w-[20px] h-[20px] items-center justify-center bg-twitch-background rounded-full"
							>
								<IconBrandTwitch
									class="h-5 w-5 text-twitch-icon"
								/>
							</div>
						</div>

						<!-- channel name -->
						<span
							class="flex ml-4 font-bold text-light-text dark:text-dark-text transition-all duration-500"
						>
							{{ view.channelData?.display_name }}
						</span>
					</span>

					<!-- action buttons -->
					<div class="flex w-full px-5">
						<!-- cancel -->
						<div class="grow flex justify-start">
							<Button
								variant="ghost"
								@click="closeModalChecker"
								class="mr-4"
							>
								{{ Lang.addChannelModal.cancel }}
							</Button>
						</div>

						<!-- submit -->
						<Button
							@click="() => toast.error(Lang.error.unimplemented)"
						>
							{{ Lang.addChannelModal.addChannel }}
						</Button>
					</div>
				</span>
			</div>
		</template>
	</Modal>
</template>
