import { onMounted, onUnmounted, onBeforeUpdate } from 'vue';

export function useLifecycleLogger(payload: { name: string }) {
	onBeforeUpdate(() => {
		//eslint-disable-next-line no-console
		console.log(payload.name, 'before update');
	});

	onMounted(() => {
		//eslint-disable-next-line no-console
		console.log(payload.name, 'mounted');
	});

	onUnmounted(() => {
		//eslint-disable-next-line no-console
		console.log(payload.name, 'unmounted');
	});
}
