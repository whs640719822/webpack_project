const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
    /**
     * @name: 
     * @Description: 
     * @LastEditors: whs
     * @param {
     *      entry：构建入口
     *      output：打包转换后的⽂件输出到磁盘位置:输出结果
     *      module：模块解析
     *      plugins：插件
     * } 
     * @return: null
     */
    /**单文件入口
        entry: "./src/index.js",
    */
    /*以对象的形式的单文件入口（等价于entry: "./src/index.js"）
        entry:{ 
            main:"./src/index.js"
        },
    */
    entry: {
        index: "./src/index.js",
        login: "./src/login.js"
    },
    /*单文件出口
        output: {
            // 将所有依赖的模块合并输出到main.js
            filename: "main.js",
            // 输出⽂件的存放路径，必须是绝对路径
            path: path.resolve(__dirname, "./dist")
        },
    */
    //多文件出口
    output: {
        // 将所有依赖的模块合并输出到main.js
        filename: "[name][chunkhash:8].js",
        // 输出⽂件的存放路径，必须是绝对路径
        path: path.resolve(__dirname, "./dist")
    },
    module: {
        rules: [
            {

                test: /\.css$/,
                //使用css-loader解析css，然后使用style-loader挂载到head之下
                loader: ['style-loader', 'css-loader']
            }
        ]
    },
    //插件
    plugins: [
        new HtmlWebpackPlugin()
    ]
};