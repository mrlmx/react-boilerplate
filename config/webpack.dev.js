const webpack = require("webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const { SERVER_HOST, SERVER_PORT } = require("./constant");

module.exports = merge(common, {
    mode: "development",
    devtool: "cheap-module-eval-source-map",
    devServer: {
        host: SERVER_HOST,
        port: SERVER_PORT,
        stats: "errors-only",
        clientLogLevel: "trace",
        compress: true,
        open: true,
        hot: true,
        hotOnly: true,
        historyApiFallback: true,
        headers: {
            // 不加的话，代理 github 的 api 会经常报错
            "User-Agent":
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36",
        },
        proxy: {
            "/api": {
                logLevel: "debug",
                changeOrigin: true,
                target: "https://api.github.com/",
                pathRewrite: {
                    "^/api": "",
                },
            },
        },
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ReactRefreshWebpackPlugin(),
    ],
});
