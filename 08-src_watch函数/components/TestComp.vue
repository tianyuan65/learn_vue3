<template>
  <h2>当前求和为：{{sum}}</h2>
  <button @click="sum++">click to plus 1</button><hr>
  <h2>当前信息为：{{msg}}</h2>
  <button @click="msg+='!'">update message</button><hr>
  <h2>姓名：{{person.name}}</h2>
  <h2>年龄：{{person.age}}</h2>
  <h2>职业：{{person.job.job1.type}}</h2>
  <button @click="person.name+='~'">modify name</button>
  <button @click="person.age++">increase age</button>
  <button @click="changeJob">change job</button>
</template>

<script>
  // 从vue引入ref函数，watch组合式API
  import {ref,reactive,watch} from 'vue'
  export default {
    name: 'TestComp',
    // Vue2
    // watch:{
      // sum(newValue,oldValue){  //简写
      //   console.log('the value of sum changed old value is ',oldValue,'new value is ',newValue);
      // },
    //   sum:{  //完整版
    //     immediate:true,  //是否立即监听属性
    //     deep:true,  //是否深度监测属性
    //     handler(newValue,oldValue){
    //       console.log('the value of sum changed old value is ',oldValue,'new value is ',newValue);
    //     }
    //   }
    // },
    
    setup(){
      let sum=ref(0)
      let msg=ref('hello')
      let person=reactive({
        name:'萧逸',
        age:23,
        job:{
          job1:{
            type:'racer'
          }
        }
      })

      // 情况一：监视ref所定义的一个响应式数据，是一个函数，监视哪一个属性就将属性名作为参数传进去，监测其变化，就在第二个参数为传递一个回调(普通、箭头都可)
      //#region
      // watch(sum,(newValue,oldValue)=>{
      //   console.log('the value of sum changed old value is ',oldValue,'new value is ',newValue);
      // })

      // 情况二：监视ref所定义的多个响应式数据
      // watch([sum,msg],(newValue,oldValue)=>{
      //   console.log('the value of sum changed old value is ',oldValue,'new value is ',newValue);
      // }
      // Vue3中接收第三个参数配置对象，可以深度监测和是否立即执行
      // {immediate:true,deep:true})
      //#endregion

      // 情况三：监视reactive所定义的一个响应式全部属性，注意：1. 此处无法获取正确的oldValue但oldValue实在是用到的地方不多，且坚持要用，在外面用ref函数定义一个年龄的响应式
      // 2. 强制开启深度监测(deep配置无效，开与不开没有影响)
      // watch(person,(newValue,oldValue)=>{
      //   console.log('the person’s value changed old value is ',oldValue,'new value is ',newValue);
      // },{deep:false})  //此处的deep配置无效
      // function changeJob(){
      //   person.job.job1.type='bounty hunter'
      // }

      // 情况四：监视reactive所定义的一个响应式数据中的某个属性，需要将监视的某个属性作为函数的返回值返回才可调用回调
      // watch(()=>person.age,(newValue,oldValue)=>{
      //   console.log('the person’s age changed old value is ',oldValue,'new value is ',newValue);
      // })

      // 情况五：监视reactive所定义的一个响应式数据中的某些属性
      // watch([()=>person.name,()=>person.age],(newValue,oldValue)=>{
      //   console.log('the person’s name/age changed old value is ',oldValue,'new value is ',newValue);
      // })

      // 特殊情况：监视reactive所定义的一个响应式数据中的某个属性为对象时，deep配置有效
      watch(()=>person.job,(newValue,oldValue)=>{
        console.log('the person’s job changed old value is ',oldValue,'new value is ',newValue);
      },{deep:true})  //此处由于监测的是reactive定义的对象中的某个属性，所以deep配置有效
      function changeJob(){
        person.job.job1.type='bounty hunter'
      }
      
      return {sum,msg,person,
        changeJob
      }
    }
  }
</script>
