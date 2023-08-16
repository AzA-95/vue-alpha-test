<template>
	<article class="article">
		<div class="pic" v-if="item.image">
			<a href="#">
				<picture class="lazy-load-parent">
					<!-- Тут можно было бы вставить webp -->
					<img v-lazy :data-src="item.image" alt="pic" />
				</picture>
			</a>
		</div>
		<div class="desc">
			<div class="date">
				<span class="date__day">{{ normalizedDate.day }}</span>
				<span class="date__month-year"
					>{{ normalizedDate.month }} <br />
					{{ normalizedDate.year }}</span
				>
			</div>
			<h4 class="name">
				<a href="#">{{ item.name }}</a>
			</h4>
			<div class="text" v-html="item.previewText"></div>
			<div class="b-tag">
				<BaseTag>
					{{ item.type.value }}
				</BaseTag>
			</div>
		</div>
	</article>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import type { ArticleType } from '@/types/article';
	import { computed } from 'vue';
	import BaseTag from '@/components/base-tag/base-tag.vue';

	const props = defineProps({
		item: {
			type: Object as PropType<ArticleType>,
			required: true,
		},
	});

	const addZeroToBeginIfLessThenTen = (num: number): string | number => {
		return 10 > num ? `0${num}` : num;
	};

	const getMonthNameInEnglish = (date: Date) => {
		return date.toLocaleString('en-us', { month: 'long' });
	};

	const normalizedDate = computed(() => {
		const timestamp = props.item.date;
		const milliseconds = timestamp * 1000;
		const date = new Date(milliseconds);

		const day = addZeroToBeginIfLessThenTen(date.getDate());
		const month = getMonthNameInEnglish(date);
		const year = date.getFullYear();

		return {
			day,
			month,
			year,
		};
	});
</script>

<style scoped lang="scss" src="./base-article.scss"></style>
