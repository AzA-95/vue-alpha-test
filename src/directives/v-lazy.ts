// При желании можно доработать для видео и audio тегов также и добавить доп опции для root, threshold и т.д
// Пока работает только для изображений (Не стал описывать коментарий на английском языке :)

export const lazyLoad = {
	mounted(el: HTMLImageElement) {
		lazyload(el);
	},
};

function lazyload(el: HTMLImageElement) {
	function loadImage() {
		const parentTag = el.parentElement as HTMLElement;

		addClass(el, parentTag, ['lazy-loading', 'lazy-loading-parent']);

		el.addEventListener('load', () => {
			removeClass(el, parentTag, ['lazy-loading', 'lazy-loading-parent']);
			addClass(el, parentTag, ['lazy-loaded', 'lazy-loaded-parent']);
		});

		el.addEventListener('error', () => {
			removeClass(el, parentTag, [
				'lazy-loading-error',
				'lazy-loading-error-parent',
			]);
			addClass(el, parentTag, ['lazy-loaded', 'lazy-loaded-parent']);
		});

		if (isPictureTag(parentTag)) {
			const sources = parentTag.querySelectorAll(
				'[data-src], [data-srcset]',
			);

			Array.from(sources).forEach((source) => {
				const src = source.getAttribute('data-src') || false;
				const srcset = source.getAttribute('data-srcset') || false;

				if (src) {
					source.setAttribute('src', src);
				}

				if (srcset) {
					source.setAttribute('srcset', srcset);
				}
			});
		} else {
			const src = el.getAttribute('data-src') || false;
			const srcset = el.getAttribute('data-srcset') || false;

			if (src) {
				el.setAttribute('src', src);
			}

			if (srcset) {
				el.setAttribute('srcset', srcset);
			}
		}
	}

	function removeClass(
		el: HTMLElement,
		parentTag: HTMLElement,
		classNames: [string, string],
	) {
		el.classList.remove(classNames[0]);

		if (parentTag.classList.contains('lazy-load-parent')) {
			parentTag.classList.remove(classNames[1]);
		}
	}

	function addClass(
		el: HTMLElement,
		parentTag: HTMLElement,
		classNames: [string, string],
	) {
		el.classList.add(classNames[0]);

		if (parentTag.classList.contains('lazy-load-parent')) {
			parentTag.classList.add(classNames[1]); // Дублируем класс родительскому тегу тоже чтобы могли анимировать loading изображений через css
		}
	}

	function isPictureTag(el: HTMLElement): Boolean {
		return el.matches('picture');
	}

	function callback(
		entries: IntersectionObserverEntry[],
		observer: IntersectionObserver,
	) {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				loadImage();
				observer.unobserve(el);
			}
		});
	}

	function createInterserctionObserver() {
		const options = {
			root: null,
			rootMargin: '150px',
			threshold: 0,
		};

		const observer = new IntersectionObserver(callback, options);

		observer.observe(el);
	}

	createInterserctionObserver();
}
