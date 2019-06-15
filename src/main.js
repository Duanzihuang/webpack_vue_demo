import Vue from 'vue'

// 导入根组件
import App from './App.vue'

// 导入less
import './global.less'

import router from './router'
import store from './store'

// 创建根实例，渲染根组件
new Vue({
    el:"#app",
    router,
    store,
    render:h => h(App)
})