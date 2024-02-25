<template>
  <!-- Vue3组件中的模板结构可以没有根标签div -->
  <h1>PersonInfo</h1>
  <h2>name:{{personData.name}}</h2>
  <h2>age:{{personData.age}}</h2>
  <button @click="test">try to trigger hello event in TestComp component</button>
</template>

<script>
  // 从vue引入reactive函数
  import {reactive} from 'vue'
  export default {
    name: 'TestComp',
    // props配置声明接收了数据才可以，且要传了几个就要在这里声明接收几个
    props:['msg','name'],
    // emits配置项中声明绑定hello事件
    emits:['hello'],
    
    // 此处只是测试一下setup函数，暂时不考虑响应式的问题
    setup(props,context){
        // console.log(props);
        // console.log(context);
        // console.log(context.attrs);  //相当于Vue2中的$attrs
        // console.log(context.emit);  //触发自定义事件的
        console.log(context.slots);  //插槽

        // 数据，调用reactive函数，将初始化的对象类型数据作为参数传递进去进行加工，来定义对象类型的响应式数据
        let personData=reactive({
            name:'Osborn',
            age:23,
        })

        // 方法
        function test(){
          context.emit('hello',111)
        }

        // 返回对象(常用)，在这里必须返回
        return {
            personData,
            test
        }
    }
  }
</script>
