const path = require("path");
const fs = require("fs");

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const PROJECT_NAME = path.parse(resolveApp(".")).name;

const { NODE_ENV, ANALYZER } = process.env;
const isDev = NODE_ENV === "development";
const isPro = NODE_ENV === "production";
const isAnalyzer = !!ANALYZER;

const SERVER_HOST = "127.0.0.1";
const SERVER_PORT = 3000;

const paths = {
    PROJECT_PATH: resolveApp("."),
    ENTRY_PATH: resolveApp("./src/index.tsx"),
    PUBLIC_PATH: resolveApp("public"),
    BUILD_PATH: resolveApp("dist"),
    SRC_PATH: resolveApp("src"),
};

module.exports = {
    PROJECT_NAME,
    NODE_ENV,
    SERVER_HOST,
    SERVER_PORT,
    isDev,
    isPro,
    isAnalyzer,
    resolveApp,
    ...paths,
};
