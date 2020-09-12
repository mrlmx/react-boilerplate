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
        proxy: {
            "/api": {
                logLevel: "debug",
                changeOrigin: true,
                target: "http://api.github.com",
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
