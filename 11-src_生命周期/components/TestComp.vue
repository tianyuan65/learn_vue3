<template>
  <h2>当前求和为：{{sum}}</h2>
  <button @click="sum++">click to plus 1</button><hr>
  
</template>

<script>
  // 从vue引入ref函数，watch组合式API
  import {onBeforeMount, onBeforeUnmount, onBeforeUpdate, onMounted, onUnmounted, onUpdated, ref} from 'vue'
  export default {
    name: 'TestComp',
    setup(){
      let sum=ref(0)

      // 通过组合式API的形式去使用生命周期钩子，就是往setup函数里写生命周期钩子
      // 每个hook都各自指定回调函数
      onBeforeMount(()=>{
        console.log('onBeforeMount hook is called');
      })
      onMounted(()=>{
        console.log('onMounted hook is called');
      })
      onBeforeUpdate(()=>{
        console.log('onBeforeUpdate hook is called');
      })
      onUpdated(()=>{
        console.log('onUpdated hook is called');
      })
      onBeforeUnmount(()=>{
        console.log('onBeforeUnmount hook is called');
      })
      onUnmounted(()=>{
        console.log('onUnmounted hook is called');
      })
      
      return {sum,}
    },

    // 通过配置项的形式使用生命周期钩子
    //#region 
    // beforeCreate钩子
    // beforeCreate(){
    //   console.log('beforeCreate hook is called');
    // },
    // // created钩子
    // created(){
    //   console.log('created hook is called');
    // },
    // // beforeMount钩子
    // beforeMount(){
    //   console.log('beforeMount hook is called');
    // },
    // // mounted钩子
    // mounted(){
    //   console.log('mounted hook is called');
    // },
    // // beforeUpdate钩子
    // beforeUpdate(){
    //   console.log('beforeUpdate hook is called');
    // },
    // // updated钩子
    // updated(){
    //   console.log('updated hook is called');
    // },
    // // beforeUnmount钩子
    // beforeUnmount(){
    //   console.log('beforeUnmount hook is called');
    // },
    // // unmounted钩子
    // unmounted() {
    //   console.log('unmounted hook is called');
    // },
    //#endregion
  }
</script>
