const path = require("path");
const { ENTRY_PATH, BUILD_PATH } = require("./constant");

module.exports = {
    entry: ENTRY_PATH,
    output: {
        filename: "js/[name].[hash:8].js",
        path: BUILD_PATH,
    },
};
