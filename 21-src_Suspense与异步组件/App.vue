<template>
  <div class="app">
    <h3>It is App component</h3>
    <!-- Suspense，内置组件，本身底层逻辑是一种插槽，来包裹需要异步展示的组件 -->
    <Suspense>
      <!-- 包裹真正需要展示的组件，并指明插槽内是什么，v-slot:default中default代表就是本应该展示的组件 -->
      <template v-slot:default>
        <Child/>
      </template>
      <!-- 包裹预备的内容，可以认为是懒加载，用v-slot:fallback来实现 -->
      <template v-slot:fallback>
        <!-- <Child/> -->
        <h3>Loading, please waiting patiently......</h3>
      </template>
    </Suspense>
  </div>
</template>

<script>
  // import ChildComp from './components/ChildComp.vue'  //静态引入组件
  // 引入定义异步组件的API，defineAsyncComponent
  import {defineAsyncComponent} from 'vue'
  // 动态引入组件/异步引入组件--赋值语句，调用defineAsyncComponent函数，传递一个回调，回调需要返回调用import函数得到的返回值，调用import函数得到的返回值就是子组件ChildComp
  const Child=defineAsyncComponent(()=>import('./components/ChildComp.vue'))
  export default {
    name:'App',
    components:{Child},
    
  }
</script>

<style>
  .app{
    background: gray;
    padding:10px;
  }
</style>