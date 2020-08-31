const path = require("path");
const fs = require("fs");

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const PROJECT_NAME = path.parse(resolveApp(".")).name;

const { NODE_ENV } = process.env;
const isDev = NODE_ENV === "development";
const isPro = NODE_ENV === "production";

const paths = {
    PROJECT_PATH: resolveApp("."),
    ENTRY_PATH: resolveApp("./src/index"),
    PUBLIC_PATH: resolveApp("public"),
    BUILD_PATH: resolveApp("dist"),
};

module.exports = {
    PROJECT_NAME,
    NODE_ENV,
    isDev,
    isPro,
    ...paths,
};
