<template>
    <div>
        <p>
            <router-link to="/newslist">新闻列表</router-link>&nbsp;&nbsp;&nbsp;
            <router-link to="/goodslist">商品列表</router-link>
        </p>
        <router-view></router-view>
        <button @click="addNews('华为5G大胜美国')">新增新闻</button>&nbsp;&nbsp;<button @click="addGoods('狗不理包子')">新增商品</button>
        <hr />
        <div id="test">测试</div>
        <div id="img"></div>
        <div id="myless">测试less</div>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    methods:{
        ...mapActions({
            addNews:'news/asyncAddNews',
            addGoods:'goods/asyncAddGoods'
        })
    }
}
</script>

<style scoped>
    @import "./App.css";
</style>