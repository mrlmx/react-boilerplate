const glob = require("glob");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const common = require("./webpack.common.js");
const { PUBLIC_PATH, BUILD_PATH, SRC_PATH } = require("./constant");

module.exports = merge(common, {
    mode: "production",
    // 如果要接入错误监控平台，可以生成，但是不自动在代码中注入 source-map 地址，单独上传到代码监控平台。
    // devtool: "nosources-source-map",
    devtool: "none",
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [{ from: PUBLIC_PATH, to: BUILD_PATH }],
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:8].css",
            chunkFilename: "css/[name].[contenthash:8].css",
            ignoreOrder: false,
        }),
        new PurgecssPlugin({
            paths: glob.sync(`${SRC_PATH}/**/*`, { nodir: true }),
        }),
    ],
});
