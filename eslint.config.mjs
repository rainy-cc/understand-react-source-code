import eslint from '@eslint/js';
import globals from 'globals';
import tsEslint from 'typescript-eslint';
import eslintPluginPrettierRecommend from 'eslint-plugin-prettier/recommended';

export default tsEslint.config(
	eslint.configs.recommended,
	...tsEslint.configs.recommended,
	eslintPluginPrettierRecommend,
	{
		languageOptions: {
			globals: {
				...globals.browser,
			},
		},
		rules: {
			'prettier/prettier': 'error',
			'@typescript-eslint/no-unused-vars': 'error',
			'no-unused-vars': 'error',
		},
	},
);
