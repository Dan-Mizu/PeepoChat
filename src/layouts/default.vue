<script setup lang="ts">
// get state
import useStore from "~/stores";
const store = useStore();
</script>

<template>
	<KeepAlive>
		<div class="static h-full flex flex-row overflow-hidden">
			<!-- Sidebar -->
			<Sidebar />

			<!-- Main View -->
			<div
				id="mainView"
				class="static grow h-full w-fit scrollbar-hidden"
				role="region"
			>
				<slot />
			</div>
		</div>
	</KeepAlive>
</template>
