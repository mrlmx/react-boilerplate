// "off" or 0 - 关闭规则
// "warn" or 1 - 将规则视为一个警告（不会影响退出码）
// "error" or 2 - 将规则视为一个错误 (退出码为1)

module.exports = {
    root: true,
    env: {
        browser: true,
        es2020: true,
        node: true,
    },
    extends: [
        "airbnb-typescript",
        "prettier",
        "prettier/react",
        "prettier/@typescript-eslint",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json", "tsconfig.eslint.json"],
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
