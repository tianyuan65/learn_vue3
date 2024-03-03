<template>
  <div class="child">
    <h3>It is ChildComp component</h3>
    {{sum}}
  </div>
</template>

<script>
  import {ref} from 'vue'
  export default {
    name:'ChildComp',
    async setup(){
      let sum=ref(0)
      let p=new Promise((resolve,) => {
        setTimeout(()=>{
          resolve({sum})  //1000ms后执行成功的函数
        },1000)
      })

      // 等到p成功的结果，再异步返回
      return await p
    }
  }
</script>

<style>
  .child{
    background: aqua;
    padding:10px;
  }
</style>