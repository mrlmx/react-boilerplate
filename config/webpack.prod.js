const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const common = require("./webpack.common.js");

module.exports = merge(common, {
    mode: "production",
    // 如果要接入错误监控平台，还是需要构建 source-map。
    devtool: "none",
    plugins: [new CleanWebpackPlugin()],
});
