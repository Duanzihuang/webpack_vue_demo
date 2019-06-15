const state = {
    goodsList:[
        '周黑鸭',
        '绝味鸭脖'
    ]
}

const getters = {
    getGoodsList(state){
        return state.goodsList
    }
}

const mutations = {
    addGoods(state,val){
        state.goodsList.push(val)
    }
}

const actions = {
    asyncAddGoods({commit},val){
        commit('addGoods',val)
    }
}

export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions
}
