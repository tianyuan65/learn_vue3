<template>
  <!-- Vue3组件中的模板结构可以没有根标签div -->
  <h1>PersonInfo</h1>
  姓：<input type="text" v-model="personData.firstName"><br>
  名：<input type="text" v-model="personData.lastName"><br>
  全名为：<span>{{personData.fullName}}</span><br>
  <!-- 这是另一个可以输入全名的输入框，有它就需要将setup里写成对象形式 -->
  姓名：<input type="text" v-model="personData.fullName">
</template>

<script>
  // 从vue引入reactive函数，computed组合式API
  import {reactive,computed} from 'vue'
  export default {
    name: 'TestComp',
    // vue2
    // computed:{
    //   fullName(){
    //     return this.personData.firstName + '-' + this.personData.lastName
    //   }
    // },

    setup(){
        // 数据，调用reactive函数，将初始化的对象类型数据作为参数传递进去进行加工，来定义对象类型的响应式数据
        let personData=reactive({
            firstName:'陆',
            lastName:'沉'
        })

        // 计算属性，vue3中computed不再是对象，而是一个需要引入后调用的函数，里面需要传入一个回调函数(这个回调普通函数箭头函数都可)--简写，未考虑计算属性被修改的情况
        // 将计算出的全名fullName定义为personData的一个属性，因为personData数据是调用reactive函数得来的Proxy实例对象，可以随意地往里增删改查属性，因此fullName也会是响应式
        // personData.fullName=computed(()=>{
        //   return personData.firstName + '-' + personData.lastName
        // })

        // 计算属性，vue3中computed不再是对象，而是一个需要引入后调用的函数，里面需要传入一个对象--完整版，考虑到被读取和被修改
        personData.fullName=computed({
          // 被读取
          get(){
            return personData.firstName + '-' + personData.lastName
          },
          // 被修改
          set(value){
            console.log(value);  //陆-沉
            // 拆分全名，调用split方法将名字分成数组
            const nameArr=value.split('-')
            personData.firstName=nameArr[0]
            personData.lastName=nameArr[1]
            return personData.firstName + '-' + personData.lastName

          }
        })

        // 返回对象(常用)，在这里必须返回
        return {
            personData,
        }
    }
  }
</script>
