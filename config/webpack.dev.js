const webpack = require("webpack");
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
        historyApiFallback: true,
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
});
