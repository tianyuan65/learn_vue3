<template>
  <h2>当前求和为：{{sum}}</h2>
  <button @click="sum++">click to plus 1</button><hr>
  <h2>当前点击时鼠标的坐标为--x:{{point.x}};y:{{point.y}}</h2>
</template>

<script>
  // 从vue引入ref函数，watch组合式API
  import {ref} from 'vue'
  import usePoint from '../hooks/usePoint'
  export default {
    name: 'TestComp',
    setup(){
      let sum=ref(0)
      
      // 调用usePoint函数，将其赋值给变量point，便于在模板中使用
      let point=usePoint()
      return {sum,point}
    },
  }
</script>
