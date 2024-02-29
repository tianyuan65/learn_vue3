<template>
  <h4>当前求和为:{{sum}}</h4>
  <button @click="sum++">click to add 1</button><hr>
  <h4>{{person}}</h4>
  <h2>姓名：{{name}}</h2>
  <h2>年龄：{{age}}</h2>
  <h2>职业：{{job.job1.type}}</h2>
  <button @click="name+='~'">modify name</button>
  <button @click="age++">increase age</button>
  <button @click="changeJob">change job</button>
</template>

<script>
  // 从vue引入ref函数，watch组合式API
  import {ref,reactive,toRefs,readonly,shallowReadonly} from 'vue'
  export default {
    name: 'TestComp',
    
    setup(){
      // 数据
      let sum=ref(0)
      let person=reactive({
        name:'萧逸',
        age:23,
        job:{
          job1:{
            type:'racer'
          }
        }
      })
      // readonly函数接收一个响应式数据person，将person加工一番后，赋值给新person，此时新person里的数据都不允许被修改
      person=readonly(person)
      // shallowReadonly只考虑对象里的第一层数据，也就是name、age不能修改，但是job里的job1和type可以改
      // person=shallowReadonly(person)
      // 调用readonly或shallowReadonly，传入基本数据类型的响应式数据，都不允许被修改
      // sum=readonly(sum)
      sum=shallowReadonly(sum)

      function changeJob(){
        // 在这了不能将hisJob作为变量修改值，报错显示是hisJob是一个常量，还是需要一步一步找到具体属性名
        person.job.job1.type='hunter'
      }

      return {
        sum,
        person,
        // 调用toRefs函数，批量将person对象的属性提取为ref对象，... 是因为在返回的对象里，通过...的方式将调用toRefs函数调用后生成的对象中的每一组键值对，摊在需要返回的对象内
        ...toRefs(person),
        changeJob,
      }
    }
  }
</script>
