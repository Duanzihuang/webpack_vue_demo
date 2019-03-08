import Vue from 'vue'

// 导入根组件
import App from './App.vue'

// 导入less
import './global.less'

// 创建根实例，渲染根组件
new Vue({
    el:"#app",
    render:h => h(App)
})