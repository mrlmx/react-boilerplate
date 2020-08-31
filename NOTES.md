# 项目搭建笔记

在这里记录此项目搭建的过程。

在开始前，咱们先明确一下当前的操作环境：

- Node.js：v12.16.3
- NPM：6.14.7
- Git：2.24.3

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

- How would you like to use ESLint?
    - To check syntax, find problems, and enforce code style
- What type of modules does your project use?
    - JavaScript modules (import/export)
- Which framework does your project use?
    - React
- Does your project use TypeScript?
    - Yes
- Where does your code run?
    - Browser
    - Node
- How would you like to define a style for your project?
    - Use a popular style guide
- Which style guide do you want to follow?
    - Airbnb: https://github.com/airbnb/javascript
- What format do you want your config file to be in?
    - JavaScript
- Would you like to install them now with npm?
    - Yes

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
    //  方案一：关掉 eslintimport/no-extraneous-dependencies 这个规则
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
```

这里建议选择方案二（两种方案任选其一即可。）

## webpack 配置

虽然目前 webpack 5 的 beta 版已经发布了，但是还没发布正式版，所以为了避免不兼容的情况，还是使用最新的稳定版，等待后续 webpack 5 正式版发布以后，再统一升级。

当前使用的 webpack 版本是：v4.43.0

首先，安装 webpack，官网提示：如果使用 webpack v4+ 版本，则还需要自行安装 CLI。

```js
yarn add webpack webpack-cli --dev
```

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
````
注意：

- 这里用到了 `npx` 这个命令，需要你的 npm 版本大于 5.2。（关于 `npx` 命令，可以看[这篇文章](http://www.ruanyifeng.com/blog/2019/02/npx.html)）
- 由于我们没有指定打包的模式，所以会输出的黄字信息，这里可以暂时不用关心，咱们后续处理。

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

### devServer

### Loader

- css
 - style-loader
 - css-loader

### webpack Feature

- 动态引入 polyfill
- 资源打包到 CDN

### 番外

#### 如何快速创建一个 webpack 模板？

- 执行 `npx webpack-cli init` 将会有个交互式的命令行
- 使用 [Create App](https://createapp.dev/webpack) 这个在线工具

## 参考

这里列出在项目搭建中对我有启发的文章链接。

P.S.：有些文章发布日期可能很老，需要自行提取有效信息。

- [为什么我们要做三份 Webpack 配置文件](https://zhuanlan.zhihu.com/p/29161762)
- [从零开始配置 react + typescript（一）：dotfiles](https://lyreal666.com/从零开始配置-react-typescript（一）：dotfiles/)
- [从零开始配置 TypeScript 项目](https://juejin.im/post/6856410900577026061)
- [TypeScript 中高级应用与最佳实践](http://www.alloyteam.com/2019/07/13796/)
- [Bruce Cli](https://yangzw.vip/source?id=bruce-cli)
- [Create App](https://createapp.dev/webpack)
- [Vue + Vant 移动端解决方案](https://mp.weixin.qq.com/s/MymdHWyHKNNxeSXIdB0qRw)
- [[2.7w字]我是这样搭建 React+Typescript项目环境的(上)](https://juejin.im/post/6860129883398668296)
- [vue-cli4-config](https://github.com/staven630/vue-cli4-config)
- [project-guidelines](https://github.com/elsewhencode/project-guidelines)