<template>
  <!-- Vue3组件中的模板结构可以没有根标签div -->
  <h1>PersonInfo</h1>
  <h2>name:{{name}}</h2>
  <h2>age:{{age}}</h2>
  <h2>gender:{{gender}}</h2>
  <button @click="sayHello">说话--sayHello(Vue3配置的)</button><br><br>
  <button @click="sayWelcome">说欢迎--sayWelcome(Vue2配置的)</button><br><br>
  <button @click="test1">测试一下在Vue2的配置中读取Vue3的数据、方法</button><br><br>
  <button @click="test2">测试一下在Vue3的setup配置中读取Vue2的数据、方法</button>
</template>

<script>
  // setup返回渲染函数时引入并应用
  // import {h} from 'vue'
  export default {
    name: 'App',
    data() {
      return {
        gender:'male'
      }
    },
    methods:{
      sayWelcome(){
        alert('Welcome to play L&G')
      },
      test1(){
        console.log(this.gender);
        console.log(this.name);
        console.log(this.age);
        console.log(this.sayHello);
      }
    },
    // 此处只是测试一下setup函数，暂时不考虑响应式的问题
    setup(){
      // 数据
      let name='Osborn'
      let age=23

      // 方法
      function sayHello() {
        // 因作用域问题，setup函数内的函数，可以不需要this就可以直接使用setup函数内的变量
        alert(`Hello!! My name is ${name}, I am ${age} years old`)
      }
      function test2(){
        console.log(this.name);
        console.log(this.age);
        console.log(this.sayHello);
        console.log(this.gender);
        console.log(this.sayWelcome);
      }

      // 返回对象(常用)
      return {
        // name:name,  //可简写
        // age:age,  //可简写
        // sayHello:sayHello  //可简写
        name,
        age,
        sayHello,
        test2
      }

      // 返回渲染函数，渲染函数要把h函数调用的结果交出去
      // return ()=> h('h1','L&G')
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
