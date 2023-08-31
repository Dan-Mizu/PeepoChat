<script setup lang="ts">
import IconButton from "src/components/ui/inputs/IconButton.vue";
import {
	IconMoodSmileBeam,
	IconFlame,
	IconCake,
	IconFlag2,
	IconRocket,
	IconWorld,
	IconBulb,
} from "@tabler/icons-vue";
import Lang from "src/assets/lang/en_us.json";

const props = defineProps<{
	active: string;
}>();
</script>

<template>
	<div class="flex justify-between">
		<!--people-->
		<div
			class="pb-[5px] border-b transition-colors duration-500"
			:class="[
				props.active === 'people'
					? 'border-light-accent dark:border-dark-accent rounded-1'
					: 'border-transparent',
			]"
		>
			<IconButton
				@click="$emit('tab-change', 'people')"
				variant="ghost"
				:title="Lang.emojiPicker.tab.people"
				:aria-label="Lang.emojiPicker.tab.people"
			>
				<IconMoodSmileBeam
					class="w-5 h-5 transition-colors duration-500"
					:class="[
						props.active === 'people'
							? ['text-light-accent dark:text-dark-accent']
							: ['text-light-tertiary dark:text-dark-tertiary'],
					]"
				/>
			</IconButton>
		</div>

		<!--nature-->
		<div
			class="pb-[5px] border-b transition-colors duration-500"
			:class="[
				props.active === 'nature'
					? 'border-light-accent dark:border-dark-accent rounded-1'
					: 'border-transparent',
			]"
		>
			<IconButton
				:title="Lang.emojiPicker.tab.nature"
				:aria-label="Lang.emojiPicker.tab.nature"
				@click="$emit('tab-change', 'nature')"
				variant="ghost"
			>
				<IconFlame
					class="w-5 h-5 transition-colors duration-500"
					:class="[
						props.active === 'nature'
							? ['text-light-accent dark:text-dark-accent']
							: ['text-light-tertiary dark:text-dark-tertiary'],
					]"
				/>
			</IconButton>
		</div>

		<!--food-->
		<div
			class="pb-[5px] border-b transition-colors duration-500"
			:class="[
				props.active === 'food'
					? 'border-light-accent dark:border-dark-accent rounded-1'
					: 'border-transparent',
			]"
		>
			<IconButton
				:title="Lang.emojiPicker.tab.food"
				:aria-label="Lang.emojiPicker.tab.food"
				@click="$emit('tab-change', 'food')"
				variant="ghost"
			>
				<IconCake
					class="w-5 h-5 transition-colors duration-500"
					:class="[
						props.active === 'food'
							? ['text-light-accent dark:text-dark-accent']
							: ['text-light-tertiary dark:text-dark-tertiary'],
					]"
				/>
			</IconButton>
		</div>

		<!--activity-->
		<div
			class="pb-[5px] border-b transition-colors duration-500"
			:class="[
				props.active === 'activity'
					? 'border-light-accent dark:border-dark-accent rounded-1'
					: 'border-transparent',
			]"
		>
			<IconButton
				@click="$emit('tab-change', 'activity')"
				variant="ghost"
				:title="Lang.emojiPicker.tab.activity"
				:aria-label="Lang.emojiPicker.tab.activity"
			>
				<IconRocket
					class="w-5 h-5 transition-colors duration-500"
					:class="[
						props.active === 'activity'
							? ['text-light-accent dark:text-dark-accent']
							: ['text-light-tertiary dark:text-dark-tertiary'],
					]"
				/>
			</IconButton>
		</div>

		<!--objects-->
		<div
			class="pb-[5px] border-b transition-colors duration-500"
			:class="[
				props.active === 'objects'
					? 'border-light-accent dark:border-dark-accent rounded-1'
					: 'border-transparent',
			]"
		>
			<IconButton @click="$emit('tab-change', 'objects')" variant="ghost">
				<IconBulb
					class="w-5 h-5 transition-colors duration-500"
					:class="[
						props.active === 'objects'
							? ['text-light-accent dark:text-dark-accent']
							: ['text-light-tertiary dark:text-dark-tertiary'],
					]"
				/>
			</IconButton>
		</div>

		<!--travel-->
		<div
			class="pb-[5px] border-b transition-colors duration-500"
			:class="[
				props.active === 'travel'
					? 'border-light-accent dark:border-dark-accent rounded-1'
					: 'border-transparent',
			]"
		>
			<IconButton
				@click="$emit('tab-change', 'travel')"
				variant="ghost"
				:title="Lang.emojiPicker.tab.travel"
				:aria-label="Lang.emojiPicker.tab.travel"
			>
				<IconWorld
					class="w-5 h-5 transition-colors duration-500"
					:class="[
						props.active === 'travel'
							? ['text-light-accent dark:text-dark-accent']
							: ['text-light-tertiary dark:text-dark-tertiary'],
					]"
				/>
			</IconButton>
		</div>

		<!--flags-->
		<div
			class="pb-[5px] border-b transition-colors duration-500"
			:class="[
				props.active === 'flags'
					? 'border-light-accent dark:border-dark-accent rounded-1'
					: 'border-transparent',
			]"
		>
			<IconButton
				:title="Lang.emojiPicker.tab.flags"
				:aria-label="Lang.emojiPicker.tab.flags"
				@click="$emit('tab-change', 'flags')"
				variant="ghost"
			>
				<IconFlag2
					class="w-5 h-5 transition-colors duration-500"
					:class="[
						props.active === 'flags'
							? ['text-light-accent dark:text-dark-accent']
							: ['text-light-tertiary dark:text-dark-tertiary'],
					]"
				/>
			</IconButton>
		</div>
	</div>
</template>
