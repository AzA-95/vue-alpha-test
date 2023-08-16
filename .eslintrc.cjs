/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
	root: true,
	extends: [
		'plugin:vue/vue3-essential',
		'eslint:recommended',
		'@vue/eslint-config-typescript',
		'@vue/eslint-config-prettier/skip-formatting',
	],
	parserOptions: {
		ecmaVersion: 'latest',
	},
	overrides: [
		{
			files: [
				// These pages are not used directly by users so they can have one-word names.
				'**/pages/**/*.{js,ts,jsx,tsx,vue}',
			],
			rules: { 'vue/multi-word-component-names': 'off' },
		},
	],
};
