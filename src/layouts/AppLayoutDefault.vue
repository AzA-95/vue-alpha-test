<template>
	<main class="wrapper">
		<TheHeader />
		<slot></slot>
		<TheFooter />
	</main>
</template>

<script setup lang="ts">
	import TheHeader from '@/components/the-header/the-header.vue';
	import TheFooter from '@/components/the-footer/the-footer.vue';
</script>
