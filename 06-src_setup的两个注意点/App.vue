<template>
  <TestComp @hello="showHelloMsg" msg="hello" name="yosh">
    <!-- 默认插槽 -->
    <!-- <span>谷江山</span> -->
    <!-- 具名插槽，vue3中具名插槽用 v-slot:插槽名 的方式命名 -->
    <template v-slot:cv>
      <span>谷江山</span>
    </template>
  </TestComp>
</template>

<script>
  // 从vue引入ref和reactive函数，这是按需引入
  import TestComp from './components/TestComp.vue'
  export default {
    name: 'App',
    components:{TestComp},
    setup(){
      function showHelloMsg(value){
        alert(`Hello, you have triggered hello event, I got the parameter ${value}!!`)
      }
      return {showHelloMsg}
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
