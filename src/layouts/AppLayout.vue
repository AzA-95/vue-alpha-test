<template>
	<component :is="layout">
		<slot></slot>
	</component>
</template>

<script setup lang="ts">
	import { useRoute } from 'vue-router';
	import { shallowRef, watch } from 'vue';

	const route = useRoute();
	const layout = shallowRef(route.meta.layoutComponent!);

	// We do not use `computed` here because it causes the layout to be redrawn
	// even if the layout has not changed
	watch(
		() => {
			return route.meta.layoutComponent;
		},
		() => {
			layout.value = route.meta.layoutComponent!;
		},
	);
</script>
