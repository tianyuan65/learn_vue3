import {reactive,onMounted,onBeforeUnmount} from 'vue'  //按需引入

// 创建鼠标“打点”相关的hook，并把相关数据、方法、生命周期钩子写入，最后默认暴露
export default function usePoint(){
    // 实现鼠标“打点”相关的数据
    let point=reactive({
        x:0,
        y:0
    })

    // 实现鼠标“打点”相关的方法，提前将绑定在window上的单击事件的回调函数写好
    function savePoint(event){
        console.log(event.pageX,event.pageY);
        point.x=event.pageX
        point.y=event.pageY
    }

    // 实现鼠标“打点”相关的生命周期钩子
    onMounted(()=>{
        // 给window绑定一个单击事件，根据点击事件event事件对象来获取鼠标点击的坐标，
        window.addEventListener('click',savePoint)
    })

    // 实现鼠标“打点”相关的生命周期钩子
    onBeforeUnmount(()=>{
        // 但当前组件卸载后，就不需要继续存在点击事件了，所以需要在组件卸载前解绑绑定在window上的点击事件
        // removeEventListener的语法是将即将移除的事件-click和事件对应的回调作为参数传递-savePoint
        window.removeEventListener('click',savePoint)
    })

    // 该文件是一个函数，可以直接在需要该文件的地方调用函数，若不返回，在真正需要的地方会是undefined，所以必须返回
    return point
}

