<template>
  <div class="app">
    <h3>It is App component(祖) , {{name}}---{{price}}</h3>
    <ChildComp/>
  </div>
</template>

<script>
import { provide, reactive,toRefs } from 'vue'
  import ChildComp from './components/ChildComp.vue'
  export default {
    name:'App',
    components:{ChildComp},
    setup(){
      let car=reactive({name:'玛莎拉蒂',price:'80W'})
      // 调用provide函数，给自己的后代组件传递数据，第一个参数是需要传递的数据，提供的数据名；第二个参数是真正的数据
      provide('car',car)

      return {...toRefs(car)}
    }
  }
</script>

<style>
  .app{
    background: gray;
    padding:10px;
  }
</style>