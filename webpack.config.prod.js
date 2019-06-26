const VueLoaderPlugin = require("vue-loader/lib/plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const path = require('path')
const glob = require('glob')

// 多页面应用打包配置【自动多入口】
const setMPA = () => {
  const entry = {}
  const htmlWebpackPlugins = []

  const entryFiles = glob.sync(path.join(__dirname,'./src/*/index.js'))

  entryFiles.forEach(item => {
    const match = item.match(/src\/(.*)\/index\.js/)
    const pageName = match && match[1]
    
    entry[pageName] = item
    htmlWebpackPlugins.push(new HtmlWebpackPlugin({
      template: path.join(__dirname,`src/${pageName}/index.html`),
      filename:`${pageName}.html`,
      chunks:[pageName],
      minify:{ // 压缩html
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true
      }
    }))
  })

  return {
    entry,
    htmlWebpackPlugins
  }
}

const {entry,htmlWebpackPlugins} = setMPA()

module.exports = {
  mode: "production", // 这个设置这个模式，生成阶段压缩代码
  entry: "./src/main.js", // 单页打包
  // entry:entry, // 多页配置
  // 开发阶段，暂时不需要配置output
  output:{
    path:path.join(__dirname,"dist"),
    // filename:'bundle.js' // 单页配置
    filename:'[name]_[chunkhash:8].js' // 单页&多页打包都可以
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ["vue-loader"]
      },
      {
        test: /\.css$/,
        // use: ["style-loader", "css-loader"]
        use:[
          {
            loader:MiniCssExtractPlugin.loader
          },
          {
            loader:'css-loader'
          },
          {
            loader:'postcss-loader',
            options:{
              plugins:[
                require('autoprefixer')
              ]
            }
          },
          {
            loader: 'px2rem-loader',
            // options here
            options: {
              remUnit: 75, // 1rem = 75px
              remPrecision: 8 // 计算出rem的小数点的个数
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader"
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            // loader: "style-loader" // creates style nodes from JS strings
            loader:MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "less-loader" // compiles Less to CSS
          },
          {
            loader:'postcss-loader',
            options:{
              plugins:[
                require('autoprefixer')
              ]
            }
          },
          {
            loader: 'px2rem-loader',
            // options here
            options: {
              remUnit: 75, // 1rem = 75px
              remPrecision: 8 // 计算出rem的小数点的个数
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.vue', '.js', '.json']
  },
  // 抽取基础库 vue、vue-router、vuex 和 公共js
  /**
  optimization:{
    splitChunks:{
      // minSize: 0, // 包最小的体积 0代表无条件提取
      cacheGroups:{
        commons:{ // 抽取基础库 vue、vue-router、vuex
          test:/(vue|vue-router|vuex)/,
          name:'vendors',
          chunks: 'all'// 同步&异步加载的都提取出来
        },
        // commons:{ // 抽取基础库 vue、vue-router、vuex
        //   name:'commons',
        //   chunks: 'all',// 同步&异步加载的都提取出来
        //   minChunks:2
        // }
      }
    }
  },
   */
  // optimization:{
  //   splitChunks:{
  //     minSize: 0, // 包最小的体积 0代表无条件提取
  //     cacheGroups:{
  //       commons:{ // 抽取基础库 vue、vue-router、vuex
  //         name:'commons',
  //         chunks: 'all',// 同步&异步加载的都提取出来
  //         minChunks:2
  //       }
  //     }
  //   }
  // },
  // 抽取用到的公共js
  plugins: [
    new CleanWebpackPlugin(),
    // vue-loader 升级到15.x之后必须要这样写
    new VueLoaderPlugin(),
    // 把开发阶段生成的bundle.js注入到 public/index中去
    new HtmlWebpackPlugin({ // 单页打包
      template: "./public/index.html",
      chunks:['vendors','commons','main'],
      minify:{ // 压缩html
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true
      }
    }),
    // 压缩css
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    }),
    // 抽取css
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name]_[contenthash:8].css'
    }),
    // 抽取基础库 vue、vue-router、vuex
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'vue',
          entry: 'https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js',
          global: 'Vue',
        },
        {
          module: 'vue-router',
          entry: 'https://unpkg.com/vue-router@3.0.6/dist/vue-router.min.js',
          global: 'VueRouter',
        },
        {
          module: 'vuex',
          entry: 'https://unpkg.com/vuex@3.1.1/dist/vuex.min.js',
          global: 'Vuex',
        }
      ]
    })
  ]
  // ].concat(htmlWebpackPlugins) // 多页配置
};
