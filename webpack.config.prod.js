const VueLoaderPlugin = require("vue-loader/lib/plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
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
  // entry: "./src/main.js",
  entry:entry,
  // 开发阶段，暂时不需要配置output
  output:{
    path:path.join(__dirname,"dist"),
    // filename:'bundle.js'
    filename:'[name]_[chunkhash:8].js'
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
  plugins: [
    new CleanWebpackPlugin(),
    // vue-loader 升级到15.x之后必须要这样写
    new VueLoaderPlugin(),
    // 把开发阶段生成的bundle.js注入到 public/index中去
    // new HtmlWebpackPlugin({
    //   template: "./public/index.html",
    //   minify:{ // 压缩html
    //     html5: true,
    //     collapseWhitespace: true,
    //     preserveLineBreaks: false,
    //     minifyCSS: true,
    //     minifyJS: true,
    //     removeComments: true
    //   }
    // }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name]_[contenthash:8].css'
    })
  ].concat(htmlWebpackPlugins)
};
