<template>
  <input type="text" v-model="keyWord">
  <h3>{{keyWord}}</h3>
</template>

<script>
  import {
    // ref,
    customRef
  } from 'vue'
  export default {
    name: 'App',
    setup(){
      // 声明一个自定义的ref，名为myRef，这里传递的参数value，我传入的初始值，也就是'hello'
      function myRef (value,delay) {
        let timer
        // 调用customRef函数得到的数据必须要返回，否则myRef无意义
        return customRef(  // 属于毛坯房，水电气都没通，需要自己装修
          // 给这个回调传递两个函数参track和trigger为参数
          (track,trigger)=>{  // 自定义的逻辑在这里写
            // 要求必须返回对象，这一步是语法要求
            return {
              // 有人读取myRef中的数据时被调用
              get(){
                // 模板中有几个读取的地方就调用几次get
                console.log(`someone read data from myRef container, I gave him ${value}`);
                track()  // 调用track函数，通知Vue追踪数据，value的改变，不写这一步模板无法获取最新数据(提前和get商量，让它认为这个value是有用的)
                return value
              },
              // 当有人通过页面上的v-model影响/修改内部数据时被调用，这里传递的newValue是数据更新时，需要传递的newValue，这就跟computed里的set一样
              set(newValue){
                console.log(`someone updated data ${newValue} in myRef container`);
                clearTimeout(timer)  // 为了防止函数抖动，定时器在不停地开启关闭，不会出现因为频繁地更新数据而抖动的情况
                timer=setTimeout(() => {  // 延迟1000ms更新数据
                  value=newValue  // 更新数据
                  trigger()  // 调用trigger函数，通知Vue重新解析模板，将最新数据呈现到页面上
                }, delay);  // 调用myRef中作为第二个参数传递了事件，在声明myRef函数时，传递delay为形参
              }
            }
          }
        )
      }
      // let keyWord=ref('hello')  //使用Vue提供的ref，相当于精装房，可拎包入住
      let keyWord=myRef('hello',1000)  //使用程序员自定义的ref，延迟1000ms在页面更新数据

      return {keyWord}
    }
  }
</script>