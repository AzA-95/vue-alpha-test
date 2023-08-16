<template>
	<router-link
		to="/"
		class="logo"
		:class="modifierClass ? `logo_${modifierClass}` : null"
	>
		<img src="./logo.svg" alt="logo" />
	</router-link>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';

	const props = defineProps({
		modifierClass: {
			type: String as PropType<'small'>,
		},
	});
</script>

<style scoped lang="scss" src="./base-logo.scss"></style>
