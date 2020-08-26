const path = require("path");
const { ENTRY_PATH, BUILD_PATH, isPro } = require("./constant");

module.exports = {
    entry: ENTRY_PATH,
    output: {
        filename: isPro ? "js/[name].[hash:8].js" : "js/[name].js",
        path: BUILD_PATH,
    },
};
