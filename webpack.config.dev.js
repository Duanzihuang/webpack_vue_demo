const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development", // 这个设置这个模式，代码不会压缩
  entry: "./src/main.js",
  // 开发阶段，暂时不需要配置output
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ["vue-loader"]
      },
      {
        test: /\.css$/,
        // use: ["style-loader", "css-loader"]
        use: [{
          loader:'style-loader'
        },{
          loader:'css-loader'
        },{
          loader:'postcss-loader',
          options:{
            plugins:[
              // require('autoprefixer')({
              //   browsers:['last 2 version','>1%','ios 7']
              // })
              require('autoprefixer')
            ]
          }
        }]
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
            loader: "style-loader" // creates style nodes from JS strings
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
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.vue', '.js', '.json']
  },
  plugins: [
    // vue-loader 升级到15.x之后必须要这样写
    new VueLoaderPlugin(),
    // 把开发阶段生成的bundle.js注入到 public/index中去
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
};
