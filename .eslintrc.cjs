module.exports = {
    env: { browser: true, es2020: true, node: true },
    settings: {
        react: {
            pragma: "React",
            version: "detect",
        },
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
        "plugin:prettier/recommended", //  引入prettier规则,避免产生冲突
        "plugin:jest-dom/recommended",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["react-refresh", "jest-dom"],
    rules: {
        "@typescript-eslint/no-unused-vars": ["off"],
        semi: "off",
        "react-refresh/only-export-components": "off",
        "no-console": "warn",
        "no-debugger": "warn",
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-namespace": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-empty-object-type": "off",
        "no-unused-expressions": [
            "error",
            {
                allowShortCircuit: true,
                allowTernary: true,
            },
        ],
        "no-param-reassign": [
            "error",
            {
                props: false,
            },
        ],
        "jest-dom/prefer-in-document": "off",
    },
}
