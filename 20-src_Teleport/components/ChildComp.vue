<template>
  <div class="child">
    <h3>It is ChildComp component</h3>
    <GrandsonComp/>
  </div>
</template>

<script>
  import GrandsonComp from './GradnsonComp.vue'
  export default {
    name:'ChildComp',
    components:{GrandsonComp}
  }
</script>

<style>
  .child{
    background: aqua;
    padding:10px;
  }
</style>