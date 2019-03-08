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

> 开发建议

```
工作中建议使用脚手架 @vue/cli create-react-app，原因如下
1、脚手架一般都是官方团队维护，有保证

2、我们自己配置，比较麻烦，并且一旦升级之后，有很多配置都得改

3、如果想对webpack底层更加了解，可以学习一下
```

