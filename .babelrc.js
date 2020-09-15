const constant = require("./config/constant");
module.exports = function (api) {
    // api.cache.using(() => process.env.NODE_ENV);
    api.cache(true);
    const presets = [
        [
            "@babel/preset-env",
            {
                // 防止babel将任何模块类型都转译成CommonJS类型，导致tree-shaking失效问题
                modules: false,
            },
        ],
        "@babel/preset-react",
        "@babel/preset-typescript",
    ];
    const plugins = [
        [
            "@babel/plugin-transform-runtime",
            {
                corejs: {
                    version: 3,
                    proposals: true,
                },
                useESModules: true,
            },
        ],
        constant.isDev && "react-refresh/babel",
        constant.isPro && "transform-react-remove-prop-types",
    ].filter(Boolean);

    return {
        presets,
        plugins,
    };
};
