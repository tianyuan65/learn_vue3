<template>
  <div class="grandson">
    <h3>It is ChildComp component(孙) , {{car.name}}--{{car.price}}</h3>
  </div>
</template>

<script>
    import {inject} from 'vue'
  export default {
    name:'GrandsonComp',
    setup() {
        // 调用inject函数，从祖先组件接收数据
        let car=inject('car')
        console.log('grandson',car);

        return {car}
    }
  }
</script>

<style>
  .grandson{
    background: lightpink;
    padding:10px;
  }
</style>