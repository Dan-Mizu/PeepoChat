<script setup lang="ts">
import { computed, ref } from "vue";
import Dropdown from "src/components/ui/navigation/Dropdown/Dropdown.vue";
import DropdownLink from "src/components/ui/navigation/Dropdown/DropdownLink.vue";

import useStore from "src/store/store";
const store = useStore();

import { toast } from "src/utils";

import { IconSquareRoundedArrowRight } from "@tabler/icons-vue";
import Lang from "src/assets/lang/en_us.json";

const props = defineProps<{
	id: string;
}>();

// handle dropdown
const dropdownActive = ref(false);
const closeDropdown = () => {
	dropdownActive.value = false;
};
const showDropdown = () => {
	dropdownActive.value = true;
};

// (event) close dropdown menu when clicking outside
const clickOutside = (event: Event) => {
	if (
		!["profile-avatar", "profile-button"].includes(
			(event.target as HTMLButtonElement).id
		)
	) {
		closeDropdown();
	}
};

// determine avatar
const avatar = computed(() => {
	if (store.user.id) return store.user.avatar;
	else return "images/anon.png";
});
</script>

<template>
	<div class="relative">
		<!--toggle dropdown button-->
		<button
			:id="props.id + '-button'"
			@click="showDropdown"
			class="bg-light-primary ring-4 ring-light-accent dark:ring-dark-accent rounded-sm transition duration-500 hover:scale-105"
			:aria-expanded="dropdownActive"
			aria-controls="profile-button"
			aria-label="toggle profile menu"
		>
			<div
				id="profile-avatar"
				:style="{ backgroundImage: `url(${avatar})` }"
				class="w-9 h-9 rounded-sm full bg-cover bg-center"
			></div>
		</button>

		<!--dropdown menu-->
		<Dropdown
			:id="props.id + '-dropdown'"
			:aria-labelledby="props.id + '-button'"
			:show="dropdownActive"
			:position="['bottom-0', 'left-[40px]', 'left-[-77px]']"
			:handle-click-outside="clickOutside"
			:close-dropdown="closeDropdown"
		>
			<DropdownLink
				label="Sign In"
				:handle-click="closeDropdown"
				tabindex="0"
				@click="toast.error(Lang.error.unimplemented)"
			>
				<IconSquareRoundedArrowRight
					class="h-5 w-5 mr-3 text-light-text dark:text-dark-text"
				/>
				{{ Lang.accountDropdown.anon.signIn }}
			</DropdownLink>
		</Dropdown>
	</div>
</template>
