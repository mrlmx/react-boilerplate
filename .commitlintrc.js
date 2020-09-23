module.exports = {
    // extends: ["@commitlint/config-conventional"],
    // rules: {
    //     "type-enum": [
    //         2,
    //         "always",
    //         [
    //             // 打包
    //             "build",
    //             // CI
    //             "ci",
    //             // 杂事？（辅助工具的变动）
    //             "chore",
    //             // 文档
    //             "docs",
    //             // 新功能
    //             "feat",
    //             // 修复 Bug
    //             "fix",
    //             // 新能优化
    //             "perf",
    //             // 功能重构
    //             "refactor",
    //             // 撤销上一次的 commit
    //             "revert",
    //             // 代码格式
    //             "style",
    //             // 测试
    //             "test",
    //         ],
    //     ],
    // },
    extends: ["gitmoji"],
    parserPreset: {
        parserOpts: {
            headerPattern: /^(:\w*:)(?:\s)(?:\((.*?)\))?\s((?:.*(?=\())|.*)(?:\(#(\d*)\))?/,
            headerCorrespondence: ["type", "scope", "subject", "ticket"],
        },
    },
};
