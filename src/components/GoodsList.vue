<template>
    <div>
        <ul>
            <li v-for="(item,index) in goodsList" :key="index">
                {{item}}
            </li>
        </ul>
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
           goodsList:'goods/getGoodsList' 
        })
    }
}
</script>
