'use strict';

module.exports = {
	root: true,
	parser: '@babel/eslint-parser',
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
		requireConfigFile: false,
		babelOptions: {
			plugins: ['@babel/plugin-proposal-class-properties'],
		},
		ecmaFeatures: {
			legacyDecorators: true,
		},
	},
	plugins: ['ember'],
	extends: ['eslint:recommended', 'plugin:ember/recommended'],
	env: {
		browser: true,
	},
	rules: {
		'ember/no-jquery': 'error',
	},
	overrides: [],
};
