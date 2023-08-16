import type { ArticleType } from './article';

export type NavigationType = {
	current: number;
	total: number;
};

export type ArticlesType = {
	nav: NavigationType;
	items: ArticleType[];
};
