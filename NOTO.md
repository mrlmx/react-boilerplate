# 项目搭建笔记

在这里记录此项目搭建的过程。

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