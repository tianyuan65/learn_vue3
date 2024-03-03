<template>
  <div class="app">
    <h3>It is App component</h3>
  </div>
</template>

<script>
import { reactive,toRefs,ref,readonly, isReactive,isReadonly,isRef,isProxy } from 'vue'
  export default {
    name:'App',
    setup(){
      let boyfriend=reactive({name:'萧逸',age:23})
      let sum=ref(0)
      let boyfriend2=readonly(boyfriend)

      console.log(isRef(sum));  // true
      console.log(isReactive(boyfriend));  // true
      console.log(isReadonly(boyfriend2));  // true
      console.log(isProxy(boyfriend));  // true
      console.log(isProxy(boyfriend2));  // true
      console.log(isProxy(sum));  // false

      
      return {...toRefs(boyfriend),sum,boyfriend2}
    }
  }
</script>

<style>
  .app{
    background: gray;
    padding:10px;
  }
</style>