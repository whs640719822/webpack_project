# webpack安装

## 环境准备

> nodeJs https://nodejs.org/en/ 
>
> 版本参考官网发布的最新版本，可以提升webpack的打包速度

## 全局安装（不推荐）

> 全局安装webpack，这会将你项目中的webpack锁定到指定版本，造成不同 的项目中因为webpack依赖不同版本而导致冲突，构建失败

```tex
# 安装webpack V4+版本时，需要额外安装webpack-cli
npm install webpack webpack-cli -g
# 检查版本
webpack -v
# 卸载
npm uninstall webpack webpack-cli -g
```

## 项目安装（推荐）

```
# 安装最新的稳定版本
npm i -D webpack
# 安装指定版本
npm i -D webpack@<version>
# 安装最新的体验版本 可能包含bug,不要用于生产环境
npm i -D webpack@beta
# 安装webpack V4+版本时，需要额外安装webpack-cli
npm i -D webpack-cli
```

## 检查安装

```
webpack -v 
//command not found 默认在全局环境中查找
npx webpack -v
// npx帮助我们在项⽬中的node_modules⾥查找webpack ./node_modules/.bin/webpack -v//到当前的node_modules模块里指定webpack
```

# 启动webpack执行构建

##  webpack默认配置

1. webpack默认支持JS模块和JSON模块
2. 支持CommonJS Es moudule AMD等模块类型
3. webpack4支持零配置使用,但是很弱，稍微复杂些的场景都需要额外扩 展

## 简单准备执行构建

	1. 新建src文件夹
 	2. 新建src/index.js、src/index.json、src/other.js

```js
### index.js
const json = require("./index.json");//commonJS
import { add } from "./other.js";//es module
console.log(json, add(2, 3));

### index.json
{
 "name": "JOSN"
}

### other.js
export function add(n1, n2) {
 return n1 + n2;
}
```

## 执行构建

1. 执行npx的方式构建

```
# npx方式
npx webpack
```

2. npm script 方式执行构建

> 修改package.json文件
>
> ```js
> "scripts": {
>  "test": "webpack"
> },
> ```

```
# npm script
npm run test
```

## 构建成功

> 我们会发现目录下多出一个 dist 目录，里面有个 main.js ，这个文件是 一个可执行的JavaScript文件（可以直接复制到浏览器console里面执行），里面包含webpackBootstrap启动函数。

## 默认配置

1. 再根目录新建一个webpack.config.js文件
2. 配置如下

```js
const path = require("path");
module.exports = {
     // 必填 webpack执行构建入口
     entry: "./src/index.js",
     output: {
         // 将所有依赖的模块合并输出到main.js
         filename: "main.js",
         // 输出文件的存放路径，必须是绝对路径
         path: path.resolve(__dirname, "./dist")
     }
};
```

## webpack配置核心概念

> 零配置是很弱的，特定的需求，总是需要自己进行配置
>
> webpack有默认的配置文件，叫 webpack.config.js ，我们可以对这个 文件进行修改，进行个性化配置
>
> 	1. 使用默认的配置文件：webpack.config.js
>  	2. 不使用自定义配置文件： 比如webpackconfig.js，可以通过--config webpackconfig.js来指定webpack使用哪个配置文件来执行构建

### webpack.config.js配置基础结构

```js
const path = require("path");
const HtmlWebpackPlugin=require("html-webpack-plugin")
module.exports = {
    // 必填 webpack执行构建入口
    entry: "./src/index.js",
    output: {
        // 将所有依赖的模块合并输出到main.js
        filename: "main1.js",
        // 输出⽂件的存放路径，必须是绝对路径
        path: path.resolve(__dirname, "./dist")
    },
    //模块解析
    module:{
        rules:[
            {
                //匹配正则,此处匹配以.css结尾的文件
                test:/\.css$/,
                //使用css-loader解析css，然后使用style-loader挂载到head之下
                loader:['style-loader','css-loader']
            }
        ]
    },
    //插件
    plugins:[
       //默认以根目录下的index.html为模板
       new HtmlWebpackPlugin()
    ]
};
```

