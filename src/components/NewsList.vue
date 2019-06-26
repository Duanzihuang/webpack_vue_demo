<template>
    <div>
        <ul>
            <li v-for="(item,index) in newsList" :key="index">
                {{item}}
            </li>
        </ul>
        <button @click="loadLazyLoad">懒加载LazyLoad组价</button>
    </div>
</template>

<script>
import {common} from '../common/index'
import {mapGetters} from 'vuex'
export default {
    created(){
        const result = common()

        console.log(result)
    },
    computed:{
        ...mapGetters({
            newsList:'news/getNewsList'
        })
    },
    methods:{
        loadLazyLoad(){
            import('./LazyLoad').then(res => {
                console.log(res)
            })
        }
    }
}
</script>
