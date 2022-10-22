module.exports = {
	env: {
		browser: true,
		es2021: true,
		jest: true,
	},
	extends: [
		"standard-with-typescript",
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:prettier/recommended",
		"plugin:import/errors",
		"plugin:import/warnings",
		"plugin:import/typescript",
	],
	overrides: [],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		project: ["./tsconfig.json"],
	},
	plugins: ["@typescript-eslint", "prettier", "import"],
	rules: {
		"prettier/prettier": "error",
		"import/extensions": "off",
		"no-console": "off",
		"import/order": [
			"error",
			{
				groups: ["external", "builtin", "internal", "sibling", "parent", "index"],
			},
		],
	},
	settings: {
		"import/parsers": {
			"@typescript-eslint/parser": [".ts"],
		},
		"import/resolver": {
			typescript: {
				alwaysTryTypes: true,
				project: "./tsconfig.json",
			},
		},
	},
};
