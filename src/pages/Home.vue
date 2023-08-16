<template>
	<div class="main-page">
		<BaseBanner title="Новости" />

		<div class="p-content">
			<BaseArticles
				:isLoading="isFirstLoading"
				:items="articles"
				class="p-articles"
			/>

			<div class="p-load-more-btn" v-if="isNeedShowLoadMoreBtn">
				<div class="container">
					<BaseButton
						@click="loadMore"
						:class="{ loading: isLoadMoreBtnDissabled }"
						:disabled="isLoadMoreBtnDissabled"
					>
						Загрузить ещё
					</BaseButton>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { ArticleType } from '@/types/article';
	import type { NavigationType, ArticlesType } from '@/types/articles';
	import {
		ref,
		watch,
		watchEffect,
		computed,
		shallowRef,
		shallowReactive,
	} from 'vue';
	import { useFetch } from '@/helpers/useFetch';

	import BaseBanner from '@/components/base-banner/base-banner.vue';
	import BaseArticles from '@/components/base-articles/base-articles.vue';
	import BaseButton from '@/components/base-button/base-button.vue';

	const currentNav = ref(1);
	const navigation = shallowRef<NavigationType | null>(null);
	const articles = shallowReactive<Array<ArticleType>>([]);
	const isFirstLoading = ref(true);
	const isLoadMoreBtnDissabled = ref(false);

	const loadMore = () => {
		if (isLoadMoreBtnDissabled.value) return;

		currentNav.value += 1;
		isLoadMoreBtnDissabled.value = true;
	};

	const awaitTimeout = (timeout: number) => {
		return new Promise((resolve) => {
			setTimeout(resolve, timeout);
		});
	};

	const isNeedShowLoadMoreBtn = computed(() => {
		if (navigation.value === null) {
			return false;
		}

		return navigation.value.current !== navigation.value.total;
	});

	const watchOnce = (
		property: any,
		callback: (...args: unknown[]) => void,
	) => {
		const unwatch = watch(property, () => {
			callback();
			unwatch();
		});
	};

	watchOnce(articles, () => {
		isFirstLoading.value = false;
	});

	watchEffect(async () => {
		try {
			const data = await useFetch<ArticlesType>(
				`test/api/news/${currentNav.value}/`,
			);

			await awaitTimeout(4000); // Имитация задержки для показа lazyload статей

			navigation.value = data.nav;
			articles.push(...data.items);
		} catch (e) {
			// Тут можно было использовать https://github.com/kyvg/vue3-notification
			// Для уведомления пользователя об ошибке но так как запрешено использовать готовые решения
			// Сделал вывод чисто alertom
			alert('Что то пошло не так');
			console.error(e);
		} finally {
			isLoadMoreBtnDissabled.value = false;
		}
	});
</script>

<style scoped lang="scss">
	@use '@/assets/styles/media.scss';

	.p-content {
		padding: 64px 0 74px;
	}

	.p-articles {
		margin-bottom: 72px;

		&:last-child {
			margin-bottom: 0;
		}
	}

	.p-load-more-btn {
		text-align: center;
	}

	@include media.sm {
		.p-content {
			padding: 40px 0;
		}

		.p-articles {
			margin-bottom: 40px;
		}
	}
</style>
