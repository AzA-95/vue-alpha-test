export default {
	'*.{ts,tsx,cts,mts,vue}': () =>
		'vue-tsc --noEmit -p tsconfig.json --composite false',
	'*.{js,cjs,mjs,ts,tsx,cts,mts,vue}': 'eslint --fix',
	'*.{css,scss,sass,vue}': 'stylelint --fix',
	'*': 'prettier --ignore-unknown --write',
};
