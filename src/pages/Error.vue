<template>
	<main class="error-page">
		<div class="container">
			<h1 class="title">{{ statusCode }}</h1>
			<div class="message">{{ message }}</div>
		</div>
	</main>
</template>

<script setup lang="ts">
	import { computed, onUnmounted } from 'vue';
	import { useErrorPageState } from '@/stores/useErrorPage';

	const state = useErrorPageState();

	const statusCode = computed(() => {
		return state.errors?.statusCode || '404';
	});

	const message = computed(() => {
		return state.errors?.message || 'Страница не найдена';
	});

	// Clear errors from the store when the component is destroyed
	onUnmounted(() => {
		state.clearErrors();
	});
</script>

<style scoped lang="scss">
	.error-page {
		color: #fff;
		padding: 50px 0;
		background: gray;
	}

	.title {
		font-size: 62px;
		text-align: center;
		margin: 0 0 45px;
	}

	.message {
		text-align: center;
	}
</style>
