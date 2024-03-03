<template>
  <h4>当前求和为:{{sum}}</h4>
  <button @click="sum++">click to add 1</button><hr>
  <h2>姓名：{{name}}</h2>
  <h2>年龄：{{age}}</h2>
  <h2>职业：{{job.job1.type}}</h2>
  <h3 v-show="person.car">座驾信息:{{person.car}}</h3>

  <button @click="name+='~'">modify name</button>
  <button @click="age++">increase age</button>
  <button @click="changeJob">change job</button>
  <button @click="showRawPerson">output the most original person</button>
  <button @click="addCar">add car for person</button>
  <button @click="person.car.name+='!'">change car name</button>
  <button @click="person.car.price++">change price</button>
</template>

<script>
  // 从vue引入ref函数，watch组合式API
  import {ref,reactive,toRefs,toRaw,markRaw} from 'vue'
  export default {
    name: 'TestComp',
    
    setup(){
      // 数据
      let sum=ref(0)
      let person=reactive({
        name:'萧逸',
        age:23,
        job:{
          job1:{
            type:'racer'
          }
        },
        // 初始渲染时，没有car属性，即使点击了按钮调用了事件回调，也不会再页面上呈现car相关的数据
        // 解决方法1就是，提前声明car属性，给car属性传递一个空对象，方便后续填入数据
        car:{}
      })

      function changeJob(){
        // 在这了不能将hisJob作为变量修改值，报错显示是hisJob是一个常量，还是需要一步一步找到具体属性名
        person.job.job1.type='hunter'
      }

      function showRawPerson() {
        // console.log(person);  // 这是响应式的person
        // console.log(toRaw(person));  // 调用toRaw加工过的响应式数据最后是原始的person对象(就是普通对象)

        console.log('sum',sum);
        const summation=toRaw(sum)
        console.log('summation',summation);
      }

      function addCar() {
        let car={name:'玛莎拉蒂',price:80}
        // 向person添加car属性，并将car赋值，添加到person的属性自此就成为了Proxy实例对象的一部分，也就是成为了响应式数据
        // person.car=car
        // 需求：若car对象是及其深层次的数据，且很复杂，复杂到无法修改或不允许被修改，只是用于呈现在页面上时，该对象就不需要成为响应式数据，
        // 此时，person.car里的数据已经是响应式数据(因为在Vue3中任何后续添加的属性、数据都是响应式)，所以需要调用MarkRaw函数将属性car这个响应式数据调为普通数据
        person.car=markRaw(car)
      }

      return {
        sum,
        // 解决方法2就是，将person返回，这样Vue就可以监测到数据的变化(属性的增删改)
        person,
        // 调用toRefs函数，批量将person对象的属性提取为ref对象，... 是因为在返回的对象里，通过...的方式将调用toRefs函数调用后生成的对象中的每一组键值对，摊在需要返回的对象内
        ...toRefs(person),
        changeJob,
        showRawPerson,
        addCar
      }
    }
  }
</script>
