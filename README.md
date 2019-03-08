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