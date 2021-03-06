# 项目搭建笔记

在这里记录此项目搭建的过程。

在开始前，咱们先明确一下当前的操作环境：

-   Node.js：v12.16.3
-   NPM：6.14.7
-   Git：2.24.3

分别执行如下命令查看：

```bash
// 查看 node 版本
node -v

// 查看 npm 版本
npm -v

// 查看 git 版本
git --version
```

## 初始化仓库

创建一个空目录，然后初始化 git。

## 设置 VS Code

把 VS Code 设置为保存自动格式化，确保项目中的代码格式统一。

格式化使用的是 [Prettier](https://github.com/prettier/prettier)。

### Prettier 配置

在项目中安装 Prettier 依赖：

```
yarn add --dev --exact prettier
```

在 VS Code 中安装 [`prettier-vscode`](https://github.com/prettier/prettier-vscode) 插件。

然后在项目的根目录新建 .vscode 文件夹，然后在里面创建 settings.json 文件，为了实现保存时，代码自动通过 Prettier 进行格式化。

文件的全路径为：**/.vscode/settings.json**

```js
{
    //  以下设置，仅针对 javascript 语言生效
    "[javascript]": {
        // 设置保存自动格式化
        "editor.formatOnSave": true,
        // 设置使用 Prettier 进行格式化
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    }
}
```

### ESLint 配置

先在本地安装 eslint：

```
yarn add react
yarn add eslint typescript --dev
```

注意，在这里，我还额外安装了 react 和 typescript，这样做的原因是想要使用 eslint 校验 react 和 typescript，而校验他们就需要安装他们本身。（后续整理为先搭建基础架构，在加入各类 Lint，这样会比较好理解一些。）

现在执行 `npx` 命令，执行 eslint，生成配置文件：

```
npx eslint --init
```

这里提供一下我生成配置文件时，做出的选择（当前 ESLint 版本为：7.7.0）：

-   How would you like to use ESLint?
    -   To check syntax, find problems, and enforce code style
-   What type of modules does your project use?
    -   JavaScript modules (import/export)
-   Which framework does your project use?
    -   React
-   Does your project use TypeScript?
    -   Yes
-   Where does your code run?
    -   Browser
    -   Node
-   How would you like to define a style for your project?
    -   Use a popular style guide
-   Which style guide do you want to follow?
    -   Airbnb: https://github.com/airbnb/javascript
-   What format do you want your config file to be in?
    -   JavaScript
-   Would you like to install them now with npm?
    -   Yes

eslint 配置完成之后，打开 src/index.js 文件后，发现 eslint 提示不能使用双引号。

这下就尴尬了，所以需要先解决一下 eslint 和 prettier 的冲突。

这里安装 prettier 官方提供的 eslint 插件（这里是不是有点绕口？[狗头]）

```
yarn add eslint-config-prettier --dev
```

然后打开 .eslintrc.js 文件，加上如下配置（后面需要确认一下到底需要哪几个插件[Prettier：Integrating with Linters](https://prettier.io/docs/en/integrating-with-linters.html)）：

```diff
...
 extends: [
     "plugin:react/recommended",
     "airbnb",
+    "prettier",
+    "prettier/@typescript-eslint",
+    "prettier/react",
 ],
...
```

现在打开 src/index.js 文件，发现已经不报错了，瞬间舒服多了。

但是如果你打开 config/webpack.dev.js 文件的话，会提示如下错误：

```
'webpack-merge' should be listed in the project's dependencies, not devDependencies.(eslintimport/no-extraneous-dependencies)
``

这是因为 eslint 的另外一个[规则](https://github.com/benmosher/eslint-plugin-import/blob/v2.22.0/docs/rules/no-extraneous-dependencies.md)。

主要的原因是，在项目中引入了外部模块，但是这个模块在 package.json 中声明的是 devDependencies，应该将它改为 dependencies。

但是，webpack-merge 这个模块，本应该就是开发依赖，所以需要改一下 eslint 的这个规则。

解决办法也很简单，要么关掉这个规则，要么把不想校验这个规则的文件告诉 eslint：

```

...
rules: {
// 方案一：关掉 eslintimport/no-extraneous-dependencies 这个规则
"import/no-extraneous-dependencies": "off",

    //  方案二：将 config 目录下的 js 文件，设置为 true（不校验 devDependencies）
    "import/no-extraneous-dependencies": [
        "error",
        {
            devDependencies: ["config/**/*.js"],
        },
    ],

},
...

````

这里建议选择方案二（两种方案任选其一即可。）

## webpack 配置

虽然目前 webpack 5 的 beta 版已经发布了，但是还没发布正式版，所以为了避免不兼容的情况，还是使用最新的稳定版，等待后续 webpack 5 正式版发布以后，再统一升级。

当前使用的 webpack 版本是：v4.43.0

首先，安装 webpack，官网提示：如果使用 webpack v4+ 版本，则还需要自行安装 CLI。

```js
yarn add webpack webpack-cli --dev
````

在 src 目录下创建 index.js 文件

```js
console.log("Hi");
```

然后执行打包命令：

```
npx webpack
```

如果看到如下类似内容，就表明打包成功啦：

```
react-boilerplate % npx webpack
Hash: c46be31efd8adf672565
Version: webpack 4.43.0
Time: 55ms
Built at: 2020-08-23 21:15:02
  Asset       Size  Chunks             Chunk Names
main.js  947 bytes       0  [emitted]  main
Entrypoint main = main.js
[0] ./src/index.js 19 bytes {0} [built]

WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/
```

注意：

-   这里用到了 `npx` 这个命令，需要你的 npm 版本大于 5.2。（关于 `npx` 命令，可以看[这篇文章](http://www.ruanyifeng.com/blog/2019/02/npx.html)）
-   由于我们没有指定打包的模式，所以会输出的黄字信息，这里可以暂时不用关心，咱们后续处理。

虽然打包成功了，但是一般来说，我们习惯于使用 npm script 命令进行打包，下面咱们来配置一下吧。

首先在项目的根目录新建 webpack.config.js 文件

```js
const path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
    },
};
```

然后在 package.json 中新增 1 个命令：

```js
"scripts": {
    "build": "webpack --config dev.config.js",
},
```

配置完成之后，执行如下命令，再次尝试打包：

```
npm run biuld
```

可以看到，输出的内容和刚刚的一样，说明咱们的配置没有问题，但是这次试用的是 `npm run build` 这个命令，是不是瞬间觉得有内味了？[奸笑]

### 区分环境

### 清理老的打包文件

每次重新打包，就会在 dist 目录中，生成新的文件，就会造成新老文件共存的情况，而且 dist 目录会越来越大。

CleanWebpackPlugin 就是为了解决这个问题，它会在每次打包的时候，先把 dist 目录里的文件删掉，这样每次打包后，就只会保留最新的文件啦。

在 webpack.prod.js 文件中，引入即可：

```
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

{
    //  ...
    plugins: [
            new CleanWebpackPlugin(),
    ]
    //  ...
}

```

### devServer

-   本地环境
-   接口转发
-   HRM

### Loader

-   css
-   style-loader
-   css-loader
-   less
-   style-loader
-   css-loader
-   less-loader
-   post-loader
-   静态资源（图片与字体）
-   url-loader
-   file-loader
-   ts & js
-   tsx & jsx
-   babel-loader
-   @babel/core
-   @babel/preset-react

使用 [favicon.io](https://favicon.io/favicon-generator/) 在线生成 favicon。

### plugins

-   copy-webpack-plugin（自动将 public 目录下的文件复制到 dist 目录中）
-   webpackbar（显示 webpack 执行进度）
-   fork-ts-checker-webpack-plugin（编译 ts 时，将错误打印在控制台）
-   hard-source-webpack-plugin（加快 webpack 二次编译的速度）
-   SplitChunksPlugin（将第三方库拆分打包：TODO）
-   react-refresh-webpack-plugin（通过此插件，实现 react 的 HMR 功能）
-   mini-css-extract-plugin（将 css 提取为独立 css 文件）
-   purgecss-webpack-plugin（打包时，移除无用的 css）
-   optimize-css-assets-webpack-plugin（压缩 css）
-   terser-webpack-plugin（压缩 javascript）
-   webpack-bundle-analyzer（分析打包后的文件大小）

### 配置 ts & tsx

-   安装 TypeScript 依赖
    -   生成 tsconfig.json 文件（[tsconfig 选项的中文介绍](https://www.tslang.cn/docs/handbook/compiler-options.html)）
        -   生成命令：`npx tsc --init`
    -   这里配置 tsconfig.json 的主要目的是为了让 编辑器 能够正确的提示错误
    -   [tsconfig.json 中 compilerOptions.module 的值都有什么区别？](https://www.staging-typescript.org/tsconfig#module)
    -   [为什么 esnext, es6, es2015 打包出来的代码都一样？](https://github.com/microsoft/TypeScript/issues/24082)
    -   [target 和 lib 的区别是什么？他们分别有什么作用？](https://stackoverflow.com/questions/42093758/need-clarification-of-the-target-and-lib-compiler-options)：为什么设置了 target，却又要设置 lib？
    -   tsconfig.json 中 compilerOptions.paths 和 webpack 的 resolve.alias 有什么区别？
        -   webpack 的配置，是为了在打包时，能够正确的找到文件路径
        -   tsconfig.json 的配置，是为了在开发时，编辑器不报错（如果需要引入图片等其他除资源，需要在 d.ts 中声明。详情可见：`./src/types/files.d.ts` 文件）
-   使用 Babel 处理 ts 文件
-   配置 ESLint 校验 ts 文件
    -   [future-typescript-eslint#the-future-of-typescript-on-eslint](https://eslint.org/blog/2019/01/future-typescript-eslint#the-future-of-typescript-on-eslint)：使用 ESLint 校验 TypeScript。
    -   [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md)：typescript-eslint 的基础使用。
-   配置 Babel 处理 tsx 文件
-   配置 ESLint 校验 tsx 文件

### WebPack 优化技巧

-   尽量使用 `include` 指定文件范围
    -   路径最好是绝对路径
    -   `exclude` 的优先级高于 `include`
-   noParse
    -   在 webpack 的 module 字段中配置
    -   告诉 WebPack 只引入相关模块，但是不进行转化和解析
    -   相关库：jquery 、lodash
-   externals
    -   在 webpack 中进行配置
    -   可以将常用的 依赖包 单独通过 CDN 引入
    -   在开发时可以正常使用 `import` 导入
    -   需要考虑一下当 CDN 报错时的备选方案
-   cache-loader（可以缓存 loader 的执行结果）
-   happypack（可以加快构建速度）
-   thread-loader（也可以加快构建速度，但是配置稍微简单些，但是也有些限制）
-   hard-source-webpack-plugin（可以为模块提供中间缓存，加快二次打包速度）
-   webpack.DllPlugin
    -   用于提取第三方库，可以避免多次构建，还是用于提升构建速度
    -   关于 dll 功能，可以查看这篇文章：[webpack 使用-详解 DllPlugin](https://segmentfault.com/a/1190000016567986)

### 怎样才能知道你的 WebPack 做的优化，真实有效？

-   speed-measure-webpack-plugin（可以测量各个插件和 loader 所花费的时间，优化后，可以用它做对比）
-

### 配置 browserslist

通过 browserslist 设置项目支持的浏览器版本

### 关于 Babel 的文章

plugins

-   babel-plugin-transform-react-remove-prop-types（在打包的时候，移除 react 的 PropTypes）

### 关于 webpack 的文章

### 关于 ESLint 的文章

### webpack Feature

-   动态引入 polyfill
-   资源打包到 CDN
-   HMR

### CSS 重置

-   Normalize.css

### 番外

#### 如何快速创建一个 webpack 模板？

-   执行 `npx webpack-cli init` 将会有个交互式的命令行
-   使用 [Create App](https://createapp.dev/webpack) 这个在线工具

### commitlint + changelog

#### commitizen

问答式交互，生成 git 提交信息，目前使用的是 [angular 的提交规范](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines)。

-   feat：新功能（feature）
-   fix：修补 bug
-   docs：文档（documentation）
-   style： 格式（不影响代码运行的变动）
-   refactor：重构（即不是新增功能，也不是修改 bug 的代码变动）
-   test：增加测试
-   chore：构建过程或辅助工具的变动

安装依赖：

```
yarn add commitizen -D
```

初始化：

```
yarn commitizen init cz-conventional-changelog --yarn --dev --exact
```

#### commitlint

用于在提交时，校验 git 的提交信息，是否符合规范。

```
yarn add conventional-changelog-cli -D
```

在 package.json 中的 `husky` 字段新增一个属性：

```javascript
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint --config .commitlintrc.js -E HUSKY_GIT_PARAMS"
    }
  },
}
```

`-E HUSKY_GIT_PARAMS` 的意思是使用 commitlint 校验提交的 message。

#### cz-emoji

在提交时，加上 emoji 也是一种不错的视觉体验。

安装：

```
yarn add cz-emoji -D
```

在 package.json 中进行如下配置：

```javascript
"config": {
  "commitizen": {
    "path": "cz-emoji"
  }
}
```

配置 lint 规则：

```
yarn add commitlint-config-gitmoji -D
```

新建或修改 .commitlintrc.js 文件：

```javascript
module.exports = {
    extends: ["gitmoji"],
    parserPreset: {
        parserOpts: {
            headerPattern: /^(:\w*:)(?:\s)(?:\((.*?)\))?\s((?:.*(?=\())|.*)(?:\(#(\d*)\))?/,
            headerCorrespondence: ["type", "scope", "subject", "ticket"],
        },
    },
};
```

关于 emoji lint 的具体规则，可以到官方 GitHub 仓库查看：[commitlint-config-gitmoji](https://github.com/arvinxx/commitlint-config-gitmoji)

## 参考

这里列出在项目搭建中对我有启发的文章链接。

P.S.：有些文章发布日期可能很老，需要自行提取有效信息。

-   [为什么我们要做三份 Webpack 配置文件](https://zhuanlan.zhihu.com/p/29161762)
-   [从零开始配置 react + typescript（一）：dotfiles](https://lyreal666.com/从零开始配置-react-typescript（一）：dotfiles/)
-   [从零开始配置 TypeScript 项目](https://juejin.im/post/6856410900577026061)
-   [TypeScript 中高级应用与最佳实践](http://www.alloyteam.com/2019/07/13796/)
-   [Bruce Cli](https://yangzw.vip/source?id=bruce-cli)
-   [Create App](https://createapp.dev/webpack)
-   [Vue + Vant 移动端解决方案](https://mp.weixin.qq.com/s/MymdHWyHKNNxeSXIdB0qRw)
-   [[2.7w 字]我是这样搭建 React+Typescript 项目环境的(上)](https://juejin.im/post/6860129883398668296)
-   [vue-cli4-config](https://github.com/staven630/vue-cli4-config)
-   [project-guidelines](https://github.com/elsewhencode/project-guidelines)
-   [Webpack HMR 原理解析](https://zhuanlan.zhihu.com/p/30669007)
-   [如何在 JXS 语法中输出大括号 `{}`？](https://github.com/facebook/react/issues/1545)
-   [node-glob](https://github.com/isaacs/node-glob)：可以根据规则匹配相关文件
-   参考写一个简单的自动部署工具
    -   [用 Node.js 创建命令行工具](http://www.html-js.com/article/2087)
    -   ["私人定制"CLI 工具](https://zhuanlan.zhihu.com/p/84397064)
    -   [前端一键自动部署工具](https://juejin.im/post/6872914108979609614)
-   [shields](https://shields.io/)：生成小徽章
-   [Commit message 和 Change log 编写指南](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)
-   [esModuleInterop 到底做了什么？](https://zhuanlan.zhihu.com/p/148081795)
-   [快速搭建基于 HTTPS 的本地开发环境](https://juejin.cn/post/6908220876357894158)
-   [vue 组件发布 npm 最佳实践](https://juejin.cn/post/6844903620916281358)

### 参考项目

-   [vue-vben-admin](https://github.com/anncwb/vue-vben-admin)
-   [html5-boilerplate](https://github.com/h5bp/html5-boilerplate)

### 问题列表

1、ESLint 提示无法匹配 .eslintrc.js 文件

```
Parsing error: "parserOptions.project" has been set for @typescript-eslint/parser.
The file does not match your project config: .eslintrc.js.
The file must be included in at least one of the projects provided.
```

解决方案：

-   [I get errors telling me "The file must be included in at least one of the projects provided"](https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/TYPED_LINTING.md#i-get-errors-telling-me-the-file-must-be-included-in-at-least-one-of-the-projects-provided)
-   [why-is-typescript-eslint-parser-including-files-outside-of-those-configured-in](https://stackoverflow.com/questions/61956555/why-is-typescript-eslint-parser-including-files-outside-of-those-configured-in)
