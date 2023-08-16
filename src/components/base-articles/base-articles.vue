<template>
	<div class="articles">
		<div class="container">
			<div class="grid">
				<template v-if="isLoading">
					<BaseArticleLoading v-for="index in 6" :key="index" />
				</template>
				<template v-else>
					<BaseArticle
						v-for="item in items"
						:key="item.code"
						:item="item"
					/>
				</template>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import type { ArticleType } from '@/types/article';
	import BaseArticle from '@/components/base-article/base-article.vue';
	import BaseArticleLoading from '@/components/base-article/base-article.loading.vue';

	const props = defineProps({
		isLoading: {
			type: Boolean,
			required: true,
		},
		items: {
			type: Array as PropType<ArticleType[]>,
			required: true,
		},
	});
</script>

<style scoped lang="scss" src="./base-articles.scss"></style>
