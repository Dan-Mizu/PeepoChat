<script setup lang="ts">
const props = defineProps<{
	open: boolean;
	closeModal: () => void;
}>();

// sync local open state to parent
const isOpen = ref(props.open);
watch(
	() => props.open,
	() => (isOpen.value = props.open)
);
</script>

<template>
	<div>
		<UModal
			v-model="isOpen"
			@close="closeModal"
			:ui="{
				background: '',
				container: 'flex items-center justify-center',
				base: '',
				overlay: {
					background: 'bg-black/40 dark:bg-black/40',
				},
			}"
		>
			<UCard
				:ui="{
					base: 'overflow-hidden p-5',
					ring: '',
					divide: '',
					background: 'bg-light-primary dark:bg-dark-primary',
					body: { base: 'text-center' },
					header: {
						base: 'text-center',
						padding: 'px-4 pb-6 sm:px-6',
					},
					footer: {
						base: 'text-center',
						padding: 'px-4 pt-6 pb-8 sm:px-6',
					},
				}"
			>
				<!-- Modal Header -->
				<template #header>
					<div class="flex items-center relative justify-center">
						<slot class="flex float-none" name="header" />
						<div class="-my-1 ml-5 absolute right-0">
							<IconButton
								icon="i-heroicons-x-mark-20-solid"
								roundedType="medium"
								size="md"
								backgroundType="secondary"
								:clickCallback="props.closeModal"
							/>
						</div>
					</div>
				</template>

				<!-- Modal Body -->
				<slot />

				<!-- Modal Footer -->
				<template #footer>
					<slot name="footer" />
				</template>
			</UCard>
		</UModal>
	</div>
</template>
