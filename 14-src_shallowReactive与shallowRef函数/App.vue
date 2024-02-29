<template>
<button @click="isShowTest = !isShowTest">switch hide/display</button>
  <!-- 若v-if所对应的表达式为false，把当前组件卸载掉 -->
  <TestComp v-if="isShowTest"/>
</template>

<script>
  import {ref} from 'vue'
  import TestComp from './components/TestComp.vue'
  export default {
    name: 'App',
    components:{TestComp},
    setup(){
      let isShowTest=ref(true)

      return {isShowTest}
    }
  }
</script>
