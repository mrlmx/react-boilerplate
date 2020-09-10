module.exports = {
    env: {
        browser: true,
        es2020: true,
        node: true,
    },
    extends: [
        "airbnb-typescript",
        "plugin:react/recommended",
        "prettier",
        "prettier/react",
        "prettier/@typescript-eslint",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: "module",
    },
    plugins: ["react", "@typescript-eslint"],
    rules: {
        "import/no-extraneous-dependencies": [
            "error",
            {
                // 将 config 目录下的 js 文件，设置为 true（不校验 devDependencies）
                devDependencies: ["config/**/*.js"],
            },
        ],
    },
};
