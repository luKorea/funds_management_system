# client

## 资金管理系统
     1.本网站css样式编写采用 sass 写法
       cnpm i stylus --save
       cnpm i stylus-loader --save
     2。使用element-ui ui库
     cnpm i element-ui
     3.安装解析token库
     cnpm i jwt-decode -s
#### 前端跨域(引入vue.config.js 文件)
    const path = require('path');
    const debug = process.env.NODE_ENV !== 'production';
    
    module.exports = {
        baseUrl: '/', // 根域上下文目录
        outputDir: 'dist', // 构建输出目录
        assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)
        lintOnSave: false, // 是否开启eslint保存检测，有效值：ture | false | 'error'
        runtimeCompiler: true, // 运行时版本是否需要编译
        transpileDependencies: [], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
        productionSourceMap: true, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
        configureWebpack: config => { // webpack配置，值位对象时会合并配置，为方法时会改写配置
            if (debug) { // 开发环境配置
                config.devtool = 'cheap-module-eval-source-map'
            } else { // 生产环境配置
            }
            // Object.assign(config, { // 开发生产共同配置
            //     resolve: {
            //         alias: {
            //             '@': path.resolve(__dirname, './src'),
            //             '@c': path.resolve(__dirname, './src/components'),
            //             'vue$': 'vue/dist/vue.esm.js'
            //         }
            //     }
            // })
        },
        chainWebpack: config => { // webpack链接API，用于生成和修改webapck配置，https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
            if (debug) {
                // 本地开发配置
            } else {
                // 生产开发配置
            }
        },
        parallel: require('os').cpus().length > 1, // 构建时开启多进程处理babel编译
        pluginOptions: { // 第三方插件配置
        },
        pwa: { // 单页插件相关配置 https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
        },
        devServer: {
            open: true,
            host: 'localhost',
            port: 8081,
            https: false,
            hotOnly: false,
            proxy: { // 配置跨域
                '/api': {
                    target: 'http://localhost:5001/api/',
                    ws: true,
                    changOrigin: true,
                    pathRewrite: {
                        '^/api': ''
                    }
                }
            },
            before: app => { }
        }
    };
#####注意事项
    <g-table ref="gTable" :columns="tableColumns"
             highlightCurrentRow
             border
             :page-size="pageSize"
             @g-table-add="handleAddClick"
             @current-change="handleCurrentChange"
             @selection-change="handleSelectionChange"
             url="http://localhost:8888/demo/testGTable"
             tooltip-effect="dark"></g-table>
    --------------------- 
    不能直接修改从父组件传递过来的值
    这种情况下就会报这个错，因为传入的prop中的值是不允许改变的。这个在vue更新后才会出现的；
    在vue2中，直接修改prop是被视作反模式的。由于在新的渲染机制中，每当父组件重新渲染时，子组件都会被覆盖，所以应该把props看做是不可变对象 ^1。；
    不能更改 quantity prop使其和父组件同步 , 而是让应该这个组件提交个事件给父组件，可以 watch quantity 变量，如果变量发生改变就emit事件，所以这里压根不需要 prop
