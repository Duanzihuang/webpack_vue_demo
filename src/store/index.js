import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import news from './modules/news'
import goods from './modules/goods'

export default new Vuex.Store({
    modules:{
        news,
        goods
    }
})