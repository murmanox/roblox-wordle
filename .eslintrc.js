module.exports = {
	parser: "@typescript-eslint/parser",
	parserOptions: {
		jsx: true,
		useJSXTextNode: true,
		ecmaVersion: 2018,
		sourceType: "module",
		tsconfigRootDir: __dirname,
		project: "./tsconfig.json"
	},
	plugins: [
		"@typescript-eslint",
		"roblox-ts",
		"prettier"
	],
	extends: [
		"plugin:@typescript-eslint/recommended",
		"plugin:roblox-ts/recommended"
	],
	rules: {
		"prettier/prettier": [
			"warn",
			{
				semi: false,
				endOfLine: "auto",
				singleQuote: true,
				trailingComma: "es5",
				printWidth: 100,
				tabWidth: 2,
				useTabs: true,
				arrowParens: "always",
				bracketSpacing: true
			}
		],
		"@typescript-eslint/no-explicit-any": ["off", {ignoreRestArgs: true}],
		camelcase: "warn",
		semi: ["warn", "never", {beforeStatementContinuationChars: "always"}],
		quotes: ["warn", "single", { "avoidEscape": true }]
	}
}