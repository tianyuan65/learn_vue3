// 引入的不再是Vue构造函数，引入的是名为createApp的工厂函数，构造函数需要new并调用来进行实例化，工厂函数不用new实例化，直接调用即可
import { createApp } from 'vue'
import App from './App.vue'

// 创建应用实例对象app(类似于vue2中的vue实例对象，但app比vue实例对象更轻，没有vue实例对象那么多方法和属性)
const app=createApp(App)
// console.log('app',app);
// 挂载
app.mount('#app')

// 直接调用createApp工厂函数，将外壳组件App作为参数传进去
// createApp(App).mount('#app')

// vue2中入口文件的写法
// import Vue from 'vue'
// new Vue({
//     render:h=>h(App)
// }).$mount('#app')
