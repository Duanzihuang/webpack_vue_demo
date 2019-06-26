# webpack_vue_demo
自己从头开始使用webpack去搭建Vue项目，用来替代@vue/cli



### 步骤

> 开发环境
```
1、写好src下面的源代码
	依赖的包:vue
	main.js App.vue
	
2、项目根目录写好 webpack.config.dev.js 【开发阶段的配置文件】
	依赖的包: webpack-dev-server webpack webpack-cli
			vue-loader vue-template-compiler style-loader css-loader
			
	配置项：
	entry:'./src/main.js' 入口
	// 开发阶段展示不需要配置output，因为打包出来的代码是运行在Node服务器上面的
	module > rules https://webpack.docschina.org/loaders/ 
		vue-loader
		...
		
	plugins 插件
		VueLoaderPlugin vue-loader15.x 必须要配置
		HtmlWebpackPlugin 生成html并且注入main.js【打包好的main.js】
	
3、使用 webpack-dev-server 打包，配置写在package.json中
	"serve": "webpack-dev-server --config webpack.config.dev.js --open --port 9000 --progress"
	
注意点：
	将来更改最多也就是webpack中配置的loader、plugins
	不同的文件，需要安装不同的loader并且进行不同的配置
		css style-loader css-loader
		png/jpg/gif file-loader url-loader
		less style-loader css-loader less less-loader
```
> 生成环境

```
1、把开发环境的配置文件拷贝过来

2、把 mode 设置为 production【压缩代码】

3、设置 output ，将来打包出来的东西生成到 dist 目录下面去

4、配置 HtmlWebpackPlugin 打包的时候压缩html

5、使用webpack打包，配置写在package.json中
	"build":"webpack --config webpack.config.prod.js --progress"
```

### Css之抽取与压缩【生产环境】

> 抽取

```
mini-css-extract-plugin
	https://github.com/webpack-contrib/mini-css-extract-plugin
```

> 压缩

```
optimize-css-assets-webpack-plugin
	https://github.com/NMFR/optimize-css-assets-webpack-plugin
```

###插件

> 自动清除dist目录
```
clean-webpack-plugin
	https://github.com/johnagan/clean-webpack-plugin
```

> PostCsss 增强css的功能

```
postcss-loader
	https://github.com/postcss/postcss-loader

autoprefixer【css 后置处理器】
	自动补全浏览器前缀
	
px2rem
	https://github.com/Jinjiang/px2rem-loader
```

> 资源内联

```
	raw-loader@0.5.1
```

> 开发建议

```
工作中建议使用脚手架 @vue/cli create-react-app，原因如下
1、脚手架一般都是官方团队维护，有保证

2、我们自己配置，比较麻烦，并且一旦升级之后，有很多配置都得改

3、如果想对webpack底层更加了解，可以学习一下
```

### 提取页面公共资源

> 基础库分离

```
抽离vue、react、react-dom这些基础库
	html-webpack-externals-plugin
```

> 公共脚本库分离/代码分割

```
webpack4自带的 splitChunksPlugin 可以抽取用到的公共模块，也可以抽取公用的基础包，比如vue react react-dom

注意：别忘记在 html-webpack-plugin 中配置chunks了
```

### tree shaking

```
一个文件/模块中有很多方法，其中只有某些方法被用到了，那么使用tree shaking就只打包用到的方法，其他没有用到的方法不打包

webpack4.x 的 production 模式默认开启了tree shaking，一个文件中的代码（比如函数）只有导入并且真正使用了才会打包，否则即使是引入了，但是没有使用它也是不会打包进去的
```

### Scope Hoisting

```
构建后的代码存在大量闭包代码

存在的问题：
	大量函数闭包包裹代码，导致体积增大（模块越多越明显）
	运行代码时创建的函数作用域变多，内存开销变大
```

### 代码分割

```
代码分割的必要性：
	代码过多，不能全部打包到bundle.js中
	
使用场景：
	抽离相同代码到一个共享块
	脚本懒加载，使得初始下载的代码更小
	
懒加载JS脚本的方式
	CommonJS  require.ensure
	ES6:动态 import (目前还没有原生的支持，需要babel转换)
	
动态加载模块 (import)的使用步骤
	1、安装一个babel插件，并且在.babelrc中配置
		https://www.npmjs.com/package/@babel/plugin-syntax-dynamic-import
	
	2、写好代码，通过import 动态导入所需要的模块
		methods:{
            loadLazyLoad(){
                import('./LazyLoad').then(res => {
                    console.log(res)
                })
            }
        }
```

### ESLint

```
JS代码规范

指定团队自己的ESLint规范
	不重复造轮子,基于eslint:recommend配置并且改进

使用步骤：
	1、安装相关的包
		eslint-loader
	
	2、在loader中配置eslint即可
```

### webpack打包组件或基础库

```
terser-webpack-plugin【压缩js】
	可以指定只压缩 .min 结尾的js文件
	
	optimization: {
        minimize:true,
        minimizer: [new TerserPlugin({
            include:/\.min\.js$/
        })]
    }
```

