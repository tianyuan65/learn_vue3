<template>
  <h4>{{person}}</h4>
  <h2>姓名：{{name}}</h2>
  <h2>年龄：{{age}}</h2>
  <!-- 用toRefs的话按照模板里的写，用toRef的话只写type -->
  <h2>职业：{{job.job1.type}}</h2>
  <button @click="name+='~'">modify name</button>
  <button @click="age++">increase age</button>
  <button @click="changeJob">change job</button>
</template>

<script>
  // 从vue引入ref函数，watch组合式API
  import {reactive,toRefs
  // toRef,
  } from 'vue'
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

      // 与toRef只能处理一个或一次属性不同的是，toRefs可以批量处理一个对象里的所有属性，所以不需要第二个参数，只需传递徐亚处理的对象作为参数即可
      const x=toRefs(person)
      console.log(x);

      function changeJob(){
        // 在这了不能将hisJob作为变量修改值，报错显示是hisJob是一个常量，还是需要一步一步找到具体属性名
        person.job.job1.type='bounty hunter'
      }

      return {
        // 这么写就是把字符串分别赋值给了name、age、type变量，和一起返回的只是普通的对象，就算修改也没有让person对象的地址值发生任何变化
        // name:person.name,
        // age:person.age,
        // type:person.job.job1.type,

        person,
        // 当想要把一个不是ref对象的属性变为ref对象的话，可调用toRef函数来实现
        // 第一个参数：想要操作的对象，就是想要提取的属性名所在的对象；第二个参数：想要提取的属性名
        // 这三个是把person对象里的三个属性，拆散了展示的，数据变化时仍与person对象对话
        // name:toRef(person,'name'),  // 调用toRef函数定义的ref对象，读取的是person.name赋值给name变量的
        // age:toRef(person,'age'),
        // type:toRef(person.job.job1,'type'),
        // 调用toRefs函数，批量将person对象的属性提取为ref对象，... 是因为在返回的对象里，通过...的方式将调用toRefs函数调用后生成的对象中的每一组键值对，摊在需要返回的对象内
        ...toRefs(person),
        changeJob
      }
    }
  }
</script>
