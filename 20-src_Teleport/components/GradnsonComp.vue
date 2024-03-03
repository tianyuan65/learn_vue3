<template>
  <div class="grandson">
    <h3>It is GrandsonComp component</h3>
    <DialogComp/>
  </div>
</template>

<script>
  import DialogComp from './DialogComp.vue'
  export default {
    name:'GrandsonComp',
    components:{DialogComp}
  }
</script>

<style>
  .grandson{
    background: lightpink;
    padding:10px;
  }
</style>