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
		"prettier",
	],
	overrides: [],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		project: ["./tsconfig.json"],
	},
	plugins: ["@typescript-eslint", "prettier", "import"],
	rules: {
		"prettier/prettier": [
			"warn",
			{},
			{
				properties: {
					usePrettierrc: true,
				},
			},
		],
		"@typescript-eslint/strict-boolean-expressions": "off",
		"eslint-disable-next-line @typescript-eslint/ban-types": "off",
		"@typescript-eslint/explicit-function-return-type": "off",
		"@typescript-eslint/no-misused-promises": "off",
		"@typescript-eslint/no-explicit-any": "off",
		"no-console": "off",
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
