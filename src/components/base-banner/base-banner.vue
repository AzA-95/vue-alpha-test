<template>
	<section class="banner">
		<div class="container">
			<div class="row">
				<h1 class="title">{{ title }}</h1>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	const props = defineProps({
		title: {
			type: String,
			required: true,
		},
	});
</script>

<style scoped lang="scss" src="./base-banner.scss"></style>
