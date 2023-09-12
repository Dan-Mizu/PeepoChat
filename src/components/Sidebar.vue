<script setup lang="ts">
// get state
import useStore from "~/store/store";
const store = useStore();

// localization
const localize = useI18n().t;

// TODO: Add Channel
const addChannel = () => {};
</script>

<template>
	<!-- Sidebar -->
	<div
		id="sidebar"
		class="w-10 h-full py-7 flex flex-col items-center bg-light-secondary dark:bg-dark-secondary"
	>
		<!-- Channels -->
		<div
			class="grow w-full pt-3 flex overflow-y-scroll scrollbar-hidden justify-center"
		>
			<ul>
				<!-- Channel Buttons -->
				<li
					v-for="(channel, _index) in store.user.channels"
					class="flex justify-center mb-3"
				>
					<ChannelButton />
				</li>

				<!-- Add Channel Button -->
				<li class="flex justify-center">
					<IconButton
						:label="localize('sidebar.add_channel_button')"
						icon="i-tabler-plus"
						backgroundType="primary"
						:clickCallback="addChannel"
					></IconButton>
				</li>
			</ul>
		</div>

		<!-- Personal -->
		<div class="mt-5 text-center">
			<!-- Theme Toggle Button -->
			<div class="mb-6 text-center"><ThemeToggleButton /></div>

			<!-- Mentions Page Button -->
			<div class="mb-6 text-center">
				<LinkIconButton
					:label="localize('sidebar.mentions_button')"
					icon="i-fluent-comment-mention-16-filled"
					:clickCallback="
						() => {
							store.activeView = { type: 'mentions' };
						}
					"
				/>
			</div>

			<!-- Separator -->
			<hr
				class="block my-6 divide-light-tertiary dark:divide-dark-tertiary"
			/>

			<!-- Account Button -->
			<AccountButton />
		</div>
	</div>
</template>
