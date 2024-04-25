module.exports = {
	root: true,
	parser: "@typescript-eslint/parser",
	extends: ["@react-native", "plugin:prettier/recommended", "prettier"],
	rules: {
		"react/react-in-jsx-scope": 0,
		"react/display-name": 0,
		"react/prop-types": 0,
		"react-native/no-inline-styles": 0,
		"@typescript-eslint/explicit-function-return-type": 0,
		"@typescript-eslint/explicit-member-accessibility": 0,
		"@typescript-eslint/indent": 0,
		"@typescript-eslint/member-delimiter-style": 0,
		"@typescript-eslint/no-explicit-any": 0,
		"@typescript-eslint/no-var-requires": 0,
		"@typescript-eslint/no-use-before-define": 0,
		"@typescript-eslint/no-unused-vars": [
			2,
			{
				argsIgnorePattern: "^_"
			}
		]
	},
	overrides: [
		{
			files: ["**/*.test.js"],
			extends: ["plugin:jest/recommended", "plugin:jest/style"]
		}
	]
};
