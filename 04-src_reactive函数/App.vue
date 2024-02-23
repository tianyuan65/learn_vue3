<template>
  <!-- Vue3组件中的模板结构可以没有根标签div -->
  <h1>PersonInfo</h1>
  <h2>name:{{name}}</h2>
  <h2>age:{{age}}</h2>
  <h3>jobType:{{job.type}}</h3>
  <h3>pay:{{job.salary}}</h3>
  <h3>hobby:{{hobby}}</h3>
  <h3>test data c:{{job.a.b.c}}</h3>
  <button @click="changeInfo">modify person’s information</button>
</template>

<script>
  // 从vue引入ref和reactive函数，这是按需引入
  import {reactive} from 'vue'
  export default {
    name: 'App',
    
    // 此处只是测试一下setup函数，暂时不考虑响应式的问题
    setup(){
      // 数据，// 调用reactive函数，将初始化的对象类型数据作为参数传递进去进行加工，来定义对象类型的响应式数据
      let personData=reactive({
        name:'Osborn',
        age:23,
        job:{
          type:'frontend engineer',
          salary:'10k',
          a:{
            b:{
              c:123
            }
          }
        },
        hobby:['Osborn','Sariel','Evan']
      })

      // 方法
      function changeInfo() {
        personData.name='Evan',
        personData.age=26
        personData.job.type='backend enginner'
        personData.job.salary='13k'
        personData.hobby[0]='study'
        // 调用reactive函数来定义对象类型的数据时，不用.value就可以拿到Proxy实例对象
        // console.log(job);  //Proxy(Object) {type: 'frontend engineer', salary: '10k'
      }

      // 返回对象(常用)，在这里必须返回
      return {
        // name:name,  //可简写
        // age:age,  //可简写
        // name,
        // age,
        // job,
        // hobby,
        personData,
        changeInfo,
      }
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
