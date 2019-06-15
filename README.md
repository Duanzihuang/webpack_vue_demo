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

