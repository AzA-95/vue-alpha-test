<template>
	<main class="wrapper">
		<TheHeader />
		<div class="error-layout-content">
			<div class="container">
				<div class="title">
					Лайоут Error не чем не отличается от дефолтного лайоута
					<br />
					и оставлен как пример для использования нескольких лайоутов
				</div>
			</div>
		</div>
		<slot></slot>
		<TheFooter />
	</main>
</template>

<script setup lang="ts">
	import TheHeader from '@/components/the-header/the-header.vue';
	import TheFooter from '@/components/the-footer/the-footer.vue';
</script>

<style scoped lang="scss">
	.title {
		font-size: 32px;
		margin-bottom: 32px;
	}
</style>
