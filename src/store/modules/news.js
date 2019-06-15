const state = {
    newsList:[
        '全球最小熊猫幼仔',
        '中国女足首胜'
    ]
}

const getters = {
    getNewsList(state){
        return state.newsList
    }
}

const mutations = {
    addNews(state,val){
        state.newsList.push(val)
    }
}

const actions = {
    asyncAddNews({commit},val){
        commit('addNews',val)
    }
}

export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions
}
