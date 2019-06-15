import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import NewsList from '../components/NewsList'
import GoodsList from '../components/GoodsList'

const router = new VueRouter({
    routes:[
        {path:'/',redirect:'newslist'},
        {path:'/newslist',component:NewsList},
        {path:'/goodslist',component:GoodsList}
    ]
})

export default router