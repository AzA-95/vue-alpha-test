<template>
	<AppLayout>
		<template v-slot:default>
			<RouterView />
		</template>
	</AppLayout>
</template>

<script setup lang="ts">
	import { RouterView } from 'vue-router';
	import AppLayout from '@/layouts/AppLayout.vue';
</script>
