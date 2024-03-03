<template>
  <div class="app">
    <h3>It is App component</h3>
    <ChildComp/>
  </div>
</template>

<script>
  import ChildComp from './components/ChildComp.vue'
  export default {
    name:'App',
    components:{ChildComp},
    
  }
</script>

<style>
  .app{
    background: gray;
    padding:10px;
  }
</style>