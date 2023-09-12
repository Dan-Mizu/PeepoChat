<script setup lang="ts">
// localization
const localize = useI18n().t;
</script>

<template>
	<div class="h-full flex flex-col">
		<!-- Alert -->
		<div
			ref="container"
			class="grow flex flex-col justify-center items-center"
		>
			<div
				class="w-10 h-10 mb-5 rounded-full bg-light-secondary dark:bg-dark-secondary flex justify-center items-center"
			>
				<Icon
					name="i-tabler-at"
					class="w-7 h-7 text-light-text dark:text-dark-text"
				/>
			</div>

			<h1 class="font-bold">
				{{ localize("view.no_mentions.header") }}
			</h1>

			<p class="flex opacity-80">
				{{ localize("view.no_mentions.description") }}
			</p>
		</div>

		<!-- standard footer -->
		<SidebarFooter />
	</div>
</template>
