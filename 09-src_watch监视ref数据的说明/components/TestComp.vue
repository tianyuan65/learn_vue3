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
  import {ref,watch} from 'vue'
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
      let person=ref({
        name:'萧逸',
        age:23,
        job:{
          job1:{
            type:'racer'
          }
        }
      })
      
      // 用ref定义基本数据类型的响应式不需要加上.value来监视，因为监测调用ref函数所定义的RefImpl实例对象，而不是数据本身，
      watch(sum,(newValue)=>{
        console.log('sum的值变化了，新值为',newValue);
      })

      console.log(person);
      // 但若调用ref函数定义的是对象类型的响应式，则需要加上.value，因为用ref定义对象类型的数据，输出的是RefImpl实例对象，
      // 这个对象里包着Proxy实例对象，就需要写成person.value，这个person.value就是Proxy实例对象，会自动开启深度监测；
      // 所以若不写.value，还要修改这个Proxy实例对象里的某个属性，因为地址值未发生改变，所以Vue不但监测不到，还会报错，
      watch(person,(newValue)=>{
        console.log('person属性的值变化了，新值为',newValue);
      },{deep:true})  // 但若坚持不写.value的话，配置deep

      return {sum,msg,person,
        
      }
    }
  }
</script>
