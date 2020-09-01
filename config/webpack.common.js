/* eslint-disable global-require */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {
    ENTRY_PATH,
    BUILD_PATH,
    isPro,
    isDev,
    resolveApp,
} = require("./constant");

module.exports = {
    entry: ENTRY_PATH,
    output: {
        filename: isPro ? "js/[name].[hash:8].js" : "js/[name].js",
        path: BUILD_PATH,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: false,
                            sourceMap: isDev,
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            ident: "postcss",
                            plugins: [
                                require("postcss-flexbugs-fixes"),
                                require("postcss-preset-env")({
                                    autoprefixer: {
                                        grid: true,
                                        flexbox: "no-2009",
                                    },
                                    stage: 3,
                                }),
                                require("postcss-normalize"),
                            ],
                            sourceMap: isDev,
                        },
                    },
                ],
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: false,
                            sourceMap: isDev,
                            importLoaders: 2, // 需要先被 less-loader 处理，所以这里设置为 1
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            ident: "postcss",
                            plugins: [
                                require("postcss-flexbugs-fixes"),
                                require("postcss-preset-env")({
                                    autoprefixer: {
                                        grid: true,
                                        flexbox: "no-2009",
                                    },
                                    stage: 3,
                                }),
                                require("postcss-normalize"),
                            ],
                            sourceMap: isDev,
                        },
                    },
                    {
                        loader: "less-loader",
                        options: {
                            sourceMap: isDev,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: resolveApp("public/index.html"),
            filename: "index.html",
            // 特别重要：防止之后使用v6版本 copy-webpack-plugin 时代码修改一刷新页面为空问题。
            cache: false,
            minify: isPro
                ? {
                      // 这里列出了所有的选项，对应的含义也可以在此查询
                      // https://github.com/terser/html-minifier-terser#options-quick-reference
                      collapseWhitespace: true,
                      removeComments: true,
                      collapseBooleanAttributes: true,
                      collapseInlineTagWhitespace: true,
                      removeRedundantAttributes: true,
                      removeScriptTypeAttributes: true,
                      removeStyleLinkTypeAttributes: true,
                      minifyCSS: true,
                      minifyJS: true,
                      minifyURLs: true,
                      useShortDoctype: true,
                  }
                : false,
        }),
    ],
};
