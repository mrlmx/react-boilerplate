const glob = require("glob");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const WebpackBundleAnalyzer = require("webpack-bundle-analyzer");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const common = require("./webpack.common.js");
const { PUBLIC_PATH, BUILD_PATH, SRC_PATH, isAnalyzer } = require("./constant");

const { BundleAnalyzerPlugin } = WebpackBundleAnalyzer;

const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap(
    merge(common, {
        mode: "production",
        // 如果要接入错误监控平台，可以生成，但是不自动在代码中注入 source-map 地址，单独上传到代码监控平台。
        // devtool: "nosources-source-map",
        devtool: "none",
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    extractComments: false,
                    terserOptions: {
                        // 移除注释
                        // output: {
                        //     comments: false,
                        // },
                        // 移除 console.log 函数
                        compress: { pure_funcs: ["console.log"] },
                    },
                }),
            ],
        },
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
            new OptimizeCssAssetsPlugin(),
            // 使用此插件，需要把上面 optimization 中移除注释的选项关闭
            new webpack.BannerPlugin({
                raw: true,
                banner:
                    "/** @preserve Powered by react-boilerplate (https://github.com/mrlmx/react-boilerplate) */",
            }),
            isAnalyzer &&
                new BundleAnalyzerPlugin({
                    analyzerMode: "server", // 开一个本地服务查看报告
                    analyzerHost: "127.0.0.1", // host 设置
                    analyzerPort: 8888, // 端口号设置
                }),
        ].filter(Boolean),
    })
);
