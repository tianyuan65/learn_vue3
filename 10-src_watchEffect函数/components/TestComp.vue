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
  import {ref,reactive,watchEffect} from 'vue'
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
      
      function changeJob(){
        person.job.job1.type='bounty hunter'
      }

      // 监测，用ref定义基本数据类型的响应式不需要加上.value来监视，因为监测调用ref函数所定义的RefImpl实例对象，而不是数据本身，
      // watch(sum,(newValue)=>{
      //   console.log('sum的值变化了，新值为',newValue);
      // },{immediate:true})

      // 监测
      watchEffect(()=>{
        // 很智能，用了哪个属性就监测哪个属性；
        const x1=sum.value
        // 很智能，能够分别多层的对象
        const jobType=person.job.job1.type
        console.log('the callback which watchEffect assigned run',x1,jobType);
      })

      return {sum,msg,person,changeJob}
    }
  }
</script>
