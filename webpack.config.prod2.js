const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    mode:'none',
    entry:{
        'large-number':'./src/common/largeNumber.js',
        'large-number.min':'./src/common/largeNumber.js'
    },
    output:{
        filename:'[name].js',
        library:'largeNumber',
        libraryTarget:'umd', // 支持AMD CJS ESM script导入等
        libraryExport:'default'
    },
    optimization: {
        minimize:true,
        minimizer: [new TerserPlugin({
            include:/\.min\.js$/
        })]
    }
}