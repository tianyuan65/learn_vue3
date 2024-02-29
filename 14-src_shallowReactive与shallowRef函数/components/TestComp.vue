<template>
  <h4>当前的x值是:{{x}}</h4>
  <h4>当前的y值是:{{y}}</h4>
  <button @click="x++">click to add 1 to x</button>
  <button @click="y++">click to add 1 to y</button>
  <hr>
  <h4>{{person}}</h4>
  <h2>姓名：{{name}}</h2>
  <h2>年龄：{{age}}</h2>
  <!-- 用toRefs的话按照模板里的写，用toRef的话只写type -->
  <h2>职业：{{job.job1.type}}</h2>
  <button @click="name+='~'">modify name</button>
  <button @click="age++">increase age</button>
  <button @click="changeJob">change job</button>
  <hr>
  <h4>{{person2}}</h4>
  <h2>姓名:{{person2.name}}</h2>
  <h2>年龄:{{person2.age}}</h2>
  <h2>职业:{{person2.job.job1.type}}</h2>
  <button @click="person2.name+='~'">modify name</button>
  <button @click="person2.age++">increase age</button>
  <button @click="changeType">change job</button>
</template>

<script>
  // 从vue引入ref函数，watch组合式API
  import {ref,reactive,toRefs,shallowReactive,shallowRef} from 'vue'
  export default {
    name: 'TestComp',
    
    setup(){
      // 数据
      let person=reactive({
        name:'萧逸',
        age:23,
        job:{
          job1:{
            type:'racer'
          }
        }
      })

      let person2=shallowReactive({  // 只考虑第一层数据的响应式
        name:'陆沉',
        age:26,
        job:{
          job1:{
            type:'boss'
          }
        }
      })

      // 若传递的是基本数据类型，ref与shallowRef的功能没差别，但传递的是对象类型时，
      let x=ref({
        b:true
      })
      console.log('ref-x:',x);
      let y=shallowRef({
        a:100
      })
      console.log('shallowRef-y:',y);

      function changeJob(){
        // 在这了不能将hisJob作为变量修改值，报错显示是hisJob是一个常量，还是需要一步一步找到具体属性名
        person.job.job1.type='hunter'
      }

      function changeType(){
        person2.job.job1.type='owner'
      }

      return {
        person,
        person2,
        x,y,
        // 调用toRefs函数，批量将person对象的属性提取为ref对象，... 是因为在返回的对象里，通过...的方式将调用toRefs函数调用后生成的对象中的每一组键值对，摊在需要返回的对象内
        ...toRefs(person),
        changeJob,
        changeType
      }
    }
  }
</script>
