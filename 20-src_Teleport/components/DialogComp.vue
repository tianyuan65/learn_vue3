<template>
  <div>
    <button @click="isShow=true">click to pop up a window</button>
    <!-- teleport标签的to属性，定位在哪里，展示值为html就是以整个页面作为 -->
    <teleport to='html'>
        <!-- 遮罩层，为其添加v-if，调用出现弹窗的事件回调时出现遮罩层 -->
        <div v-if="isShow" class="mask">
            <div class="dialog">
                <h3>It is a pop-up</h3>
                <h4>some content</h4>
                <h4>some content</h4>
                <h4>some content</h4>
                <button @click="isShow=false">click to close the window</button>
            </div>
        </div>
    </teleport>
  </div>
</template>

<script>
    import {ref} from 'vue'
    export default {
        name:'DialogComp',
        setup(){
            let isShow=ref(false)

            return {isShow}
        }
    }
</script>

<style>
    .mask{
        position: absolute;
        top:0;bottom:0;left:0;right:0;
        background: rgba(0,0,0,0.5);
    }
    .dialog{
        position: absolute;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width:300px;
        height:300px;
        background: #bfa;
        text-align: centers;
    }
</style>