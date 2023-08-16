// export {}

import 'vue-router';
import type { Component } from 'vue';
import type { LayoutsNameType } from './src/types/layout';

declare module 'vue-router' {
	interface RouteMeta {
		layout?: LayoutsNameType;
		layoutComponent?: Component;
		middleware?: string[];
	}
}
