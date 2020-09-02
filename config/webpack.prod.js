const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const common = require("./webpack.common.js");

module.exports = merge(common, {
    mode: "production",
    // 如果要接入错误监控平台，可以生成，但是不自动在代码中注入 source-map 地址，单独上传到代码监控平台。
    // devtool: "nosources-source-map",
    devtool: "none",
    plugins: [new CleanWebpackPlugin()],
});
