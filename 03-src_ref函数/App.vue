<template>
  <!-- Vue3组件中的模板结构可以没有根标签div -->
  <h1>PersonInfo</h1>
  <h2>name:{{name}}</h2>
  <h2>age:{{age}}</h2>
  <h3>jobType:{{job.type}}</h3>
  <h3>pay:{{job.salary}}</h3>
  <button @click="changeInfo">modify person’s information</button>
</template>

<script>
  // 从vue引入ref函数，这是按需引入
  import {ref} from 'vue'
  export default {
    name: 'App',
    
    // 此处只是测试一下setup函数，暂时不考虑响应式的问题
    setup(){
      // 调用ref函数，将初始化的数据作为参数传进去进行加工，并赋值给变量name和age，此时name和age都是引用对象
      let name=ref('Osborn')
      let age=ref(23)
      let job=ref({
        type:'frontend engineer',
        salary:'10k'
      })

      // 方法
      function changeInfo() {
        // name.value='Evan',
        // age.value=26
        // console.log('name:',name,'age:',age);
        job.value.type='backend enginners'
        job.value.salary='12k'
        console.log('job:',job.value);  //job:Proxy(Object) {type: 'backend enginners', salary: '12k'}
      }

      // 返回对象(常用)，在这里必须返回
      return {
        // name:name,  //可简写
        // age:age,  //可简写
        name,
        age,
        job,
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
