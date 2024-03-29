## Vue3快速上手
* 1. Vue3简介
    * 2020年9月18日，Vue.js发布3.0版本，代号：One Piece(海贼王)
    * 耗时两年多、2600+次提交、30+哥RFC、600+次PR、99位贡献者
    * github上的tags地址：https://github.com/vuejs/vue-next/releases/tag/v3.0.0
* 2. Vue3带来了什么
    * 2.1 性能的提升
        * 打包大小减少41%
        * 初次渲染快55%，更新渲染快133%
        * 内存减少54%
        ...
    * 2.2 源码的升级
        * 使用Proxy代替defineProperty实现响应式
        * 重写虚拟DOM的实现和Tree-Shakong
        ...
    * 2.3 拥抱TypeScript
        * Vue3 可以更好地支持TypeScript
        ...
    * 2.4 新的特性
        * 1. Composition API(组合API)
            * setup配置
            * ref与reactive
            * watch与watchEffect
            * provide与inject
            ....
        * 2. 新的内置组件
            * Fragment
            * Teleport
            * Suspense
        * 3. 其他改变
            * 新的生命周期钩子
            * data选项应始终被声明为一个函数，不管是否为组件，data选项都应被声明为函数形式
            * 移除keyCode支持作为v-on的修饰符
            ...

## 第一章、创建Vue3.0
* 1.1 使用vue-cli创建
    * 官方文档：https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create
    * 1. 需要查看vue-cli的版本，要确保vue-cli的版本在4.5.0以上，我的是5.0.8，若vue-cli版本在4.5.0以下，则安装升级vue-cli版本，```npm i -g @vue-cli```，会将最新版本的vue-cli版本安装好，并覆盖掉旧版本；
    * 2. 创建一个vue脚手架项目，```vue create vue3_test```
    * 3. 创建好项目脚手架后，就可以在vue3_test目录下启动，
        * ```
            cd vue3_test
            npm run serve
          ```
* 1.2 使用vite创建
    * 官方文档：https://v3.cn.vuejs.org/guide/installation.html#vite
    * vite官网：https://vitejs.cn
    * 什么是vite？----新一代前端构建工具
    * 优势如下：
        * 1. 开发环境中，无需打包操作，可快速的冷启动
        * 2. 轻量快速地热重载(HMR)
        * 3. 真正的按需编译，不再等待整个应用编译完成
    * 传统构建与vite构建对比图
        * 图找不到，在尚硅谷138课看吧
        * 1. 创建工程，npm init vite-app <project-name>
        * 2. 进入工程目录，cd <project-name>
        * 3. 安装依赖，npm install
        * 4. 运行，npm run dev
## 第二章、常用Composition API
* 官方文档：https://v3.cn.vuejs.org/guide/composition-api-introduction.html
* 2.1 拉开序幕的setup
    * 1. 理解：Vue3.0中一个新的配置项，值为一个函数
    * 2. setup是所有Composition API(组合API)**表演的舞台**
    * 3. 组件中所用到的：数据、方法等，均要配置在setup中
    * 4. setup函数的两种返回值：
        * (1). **若返回一个对象，则对象中的属性、方法，在模板中均可以直接使用(重点关注)**
        * (2). 若返回一个渲染函数：则可以自定义渲染内容
    * 5. 注意点：
        * (1). 尽量不要与Vue2.x的配置混用
            * Vue2.x配置(data、methods、computed...)中可以访问到setup中的属性、方法。
            * 但在setup中不能访问到Vue2.x配置(data、methods、computed...)
            * 如果有重名setup优先
        * (2). setup不能是一个async函数，因为返回值不再是return的对象，而是promise，模板看不到return对象中的属性(后期也可以返回一个Promise实例，但需要Suspense和异步组件的配合)
* 2.2 ref函数
    * 1. 作用：定义一个响应式的数据，用于数据是基本类型
    * 2. 语法：const xxx=ref(initValue)
        * 创建一个包含响应式数据的**引用对象**(全称：引用实现的实例对象，reference对象，简称ref对象)
        * JS中操作数据：xxx.value
        * 模板中读取数据: 不需要.value，直接：``<div>{{xxx}}</div>``
    * 备注：
        * 接收的数据可以是：基本类型、也可以是对象类型。
        * 基本类型的数据：响应式依然是靠 Object.defineProperty()的 get与 set完成的。
        * 对象类型的数据：内部**求助**了Vue3.0中的一个新函数—— reactive函数。
    * ![JS中操作数据，需要xxx.value，否则无法更新数据](images/数据已被修改，但未在页面上呈现最新数据.png)
    * ![加了.value后，成功更新数据](images/成功修改数据.png)
* 2.3 reactive函数
    * 1. 作用：定义一个**对象类型**的响应式数据(基本类型别用它，用ref函数)
    * 2. 语法：const 代理对象-proxy=reactive(源对象-Object)，接收一个对象或数组，返回一个代理器对象(Proxy实例对象)，将普通对象转为Proxy实例对象的目的就是为了把数据变成响应式数据，且转为Proxy对象后，修改里面任何一个属性，vue3都可以监测到，并更新页面。
    * 3. reactive函数定义的响应式数据是**深层次的**
    * 4. 内部基于ES6的Proxy实现，通过代理对象(Proxy实例对象)操作源对象(Object)内部数据进行操作，且这些操作是可以被Vue所捕获到的，也就是数据劫持
        * ![定义基本类型数据不要用reactive函数，但是reactive函数定义的对象里可以有基本数据类型](images/定义基本类型数据不要用reactive函数.png)
        * ![调用reactive函数定义对象类型的响应式数据，图示可以看出初始的响应式数据的](images/调用reactive函数定义对象类型的响应式数据.png)
        * ```
            // 数据
            let job=reactive({
                type:'frontend engineer',
                salary:'10k',
            })
            // 方法
            function changeInfo(){
                job.type='backend enginner'
                job.salary='13k'
            }
            // 返回对象
            return {
                job,
                changeInfo
            }
          ```
            * ![上述代码，调用reactive函数，成功修改对象类型的数据，还不写.value](images/成功修改对象类型的数据，不用写value.png)
        * ```
            let hobby=['Osborn','Sariel','Evan']
            function changeInfo(){
                hobby[0]='study'
            }
            return {hobby,changeInfo}
          ```
            * ![调用reactive，传递数组，成功将Osborn改为study](images/调用reactive函数传递数组，直接在事件函数中修改Osborn为study.png)
* 2.4 Vue2.0中的响应式原理
    * 2.4.1 Vue2.x的响应式
        * 1. 实现原理：
            * 对象类型：通过Object.defineProperty()对属性的读取、修改进行拦截(数据劫持)
            * 数组类型：通过重写更新数组的一系列方法来实现拦截(对数组的变更方法进行了包裹)
                * ```
                    Object.defineProperty(data,'count',{
                        get(){},
                        set(){}
                    })
                  ```
        * 2. 存在问题：
            * 新增属性、删除属性，界面不会更新
            * 直接通过下标修改数组，界面不会自动更新
            * ![Vue2.x中通过Object.defineProperty()实现数据的响应式](images/Vue2中实现数据的响应式.png)
    * 2.4.2 Vue3.0的响应式
        * 实现原理：
            * 1. 通过Proxy(代理)对象：拦截对象中任意属性的变化，包括：属性值的读写、属性的添加、属性的删除等。
                * ![输出Proxy对象，有可对数据进行增删改查操作的配置-Handler，也有数据-Target](images/Proxy能够让p映射源数据person的操作，Handler中有对数据进行增删改查的配置，Target中有数据.png)
                * ![通过Proxy对象拦截对象中属性的变化](images/Proxy可以捕获到对属性的增删改查的操作.png)
                * ![Proxy配置对象中配置get函数，用于读取数据，接收的target和propName参数](images/get函数中接收的两个参数target和propName.png)
                * ![Proxy配置对象中配置set函数，用于更新属性值和添加新属性，接收的target、propName以及value参数](images/输出set函数中接收的参数，源数据、修改的属性、修改的属性的值.png)
            * 2. 通过Reflect(反射)对象：对源对象的属性进行增删改查的操作
            * 3. MDN文档中描述的Proxy与Reflect：
                * Proxy：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy
                * Reflect：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect
                * ```
                    new Proxy(data,{
                        // 拦截读取属性值
                        get(target,propName){
                            return Reflect.get(target.propName)
                        }
                        // 拦截修改属性值或添加新属性
                        set(target,propName,value){
                            return Reflect.set(target,propName,value)
                        }
                        // 拦截删除属性
                        deleteProperty (target, propName) {
                            return Reflect.deleteProperty(target, propName)
                        }
                    })
                  ```
* 2.5 reactive对比ref
    * 2.5.1 从定义数据角度对比：
        * 1. ref用来定义：**基本类型数据**
        * 2. reactive用来定义：**对象或数组类型数据**
        * 3. 备注：ref也可以用来定义对象/数组类型数据，他内部会自动通过reactive转为代理对象(Proxy实例对象)
    * 2.5.2 从原理角度对比：
        * 1. ref通过Object.defineProperty()的get与set来实现响应式(数据劫持)
        * 2. reactive通过使用Proxy来实现响应式(数据劫持)，并通过Reflect操作**源对象**内部的数据
    * 2.5.3 从使用角度对比：
        * 1. ref定义的数据：操作数据需要.value，读取数据时模板中直接读取不需要.value
        * 2. reactive定义的数据：操作数据与读取数据，均不需要.value
* 2.6 setup的两个注意点
    * 1. setup执行的时机
        * 在beforeCreate钩子之前执行一次，this指向undefined
    * 2. setup的参数
        * props：值为对象，包含：组件外部传递过来，且组件内部声明接收了的属性，传了几个属性，就要在子组件声明接收几个，否则报警告。
            * ![用props配置项声明接收和没声明接收时Proxy实例对象](images/用props配置声明接收数据是和没声明接收时.png)
        * context：上下文对象
            * attrs：值为对象，包含组件外部传递过来，但没有在props配置中声明的属性，相当于this.$attrs，它来兜底，子组件的props配置中没有接收的，在这里偷偷地存着。
            * slots：收到的插槽内容，相当于this.$slots。值得注意的是，vue3中具名插槽的命名方式有所改动，需要用v-slot:slotName的方式命名。
                * ```
                    <template v-slot:cv>
                        <span>谷江山</span>
                    </template>
                  ```
                * ![配置默认插槽和具名插槽](images/配置默认插槽和具名插槽.png)
            * emit：分发自定义事件的函数，相当于this.$emit。
                * ```
                    App
                    <TestComp @hello="showHelloMsg" msg="hello" name="yosh"/>
                    ...
                    setup(){
                        function showHelloMsg(value){
                            alert(`Hello, you have triggered hello event, I got the parameter ${value}!!`)
                        }
                        return {showHelloMsg}
                    }

                    TestComp
                    <button @click="test">try to trigger hello event in TestComp component</button>
                    ...
                    emits:['hello'],
                    setup(){
                        function test(){
                            context.emit('hello',111)
                        }
                        return {test}
                    }
                  ```
                * ![在emits配置项中声明绑定的事件，方法中调用emit方法来绑定事件并传递数据作为参数](images/emits配置项中声明绑定的事件，方法中调用emit方法绑定事件并传递数据作为参数.png)
* 2.7 计算属性与监视
    * 2.7.1 computed函数
        * 与Vue2.x中computed配置功能一致，也分简写和完整写法，当计算出来的属性也可能被读取和修改的话，就用完整写法，否则只是删掉初始化数据都会报错
        * 写法：
            * ```
                import {computed} from 'vue'
                setup(){
                    let personData=reactive({
                        firstName:'陆',
                        lastName:'沉'
                    })
                    // 计算属性--简写，未考虑计算属性被修改的情况
                    // 将计算出的全名fullName定义为personData的一个属性，因为personData数据是调用reactive函数得来的Proxy实例对象，可以随意地往里增删改查属性，因此fullName也会是响应式
                    personData.fullName=computed(()=>{
                      return personData.firstName + '-' + personData.lastName
                    })

                    // 计算属性--完整版，考虑到被读取和被修改
                    personData.fullName=computed({
                        // 被读取
                        get(){
                            return personData.firstName + '-' + personData.lastName
                        },
                        // 被修改
                        set(value){
                            console.log(value);  //陆-沉
                            // 拆分全名，调用split方法将名字分成数组
                            const nameArr=value.split('-')
                            personData.firstName=nameArr[0]
                            personData.lastName=nameArr[1]
                            return personData.firstName + '-' + personData.lastName
                        }
                    })

                    // 返回对象(常用)，在这里必须返回
                    return {
                        personData,
                    }
                }
              ```
            * ![用computed配置计算出的fullName](images/computed计算来的全名.png)
            * ![当计算出的属性会被读取或修改时，需要写完整写法，否则如图](images/只是删除了初始化的数据就会报错，所以这种情况需要写完整版.png)
    * 2.7.2 watch函数
        * 1. 与Vue2.x中watch配置功能一致
        * 2. 两个小“坑”：
            * 监视reactive定义的响应式数据时，oldValue无法正确获取，强制开启了深度监视(deep配置失效)
            * 监视reactive定义的响应式数据的某个属性为对象时，deep配置生效
            * ```
                // 情况一：监视ref所定义的一个响应式数据，是一个函数，监视哪一个属性就将属性名作为参数传进去，监测其变化，就在第二个参数为传递一个回调(普通、箭头都可)
                watch(sum,(newValue,oldValue)=>{
                  console.log('the value of sum changed old value is ',oldValue,'new value is ',newValue);
                })

                // 情况二：监视ref所定义的多个响应式数据
                watch([sum,msg],(newValue,oldValue)=>{
                  console.log('the value of sum changed old value is ',oldValue,'new value is ',newValue);
                }
                // Vue3中接收第三个参数配置对象，可以深度监测和是否立即执行
                {immediate:true,deep:true})

                // 情况三：监视reactive所定义的一个响应式全部属性，注意：1. 此处无法获取正确的oldValue但oldValue实在是用到的地方不多，且坚持要用，在外面用ref函数定义一个年龄的响应式
                // 2. 强制开启深度监测(deep配置无效，开与不开没有影响)
                watch(person,(newValue,oldValue)=>{
                  console.log('the person’s value changed old value is ',oldValue,'new value is ',newValue);
                },{deep:false})  //此处的deep配置无效
                function changeJob(){
                  person.job.job1.type='bounty hunter'
                }

                // 情况四：监视reactive所定义的一个响应式数据中的某个属性，需要将监视的某个属性作为函数的返回值返回才可调用回调
                watch(()=>person.age,(newValue,oldValue)=>{
                  console.log('the person’s age changed old value is ',oldValue,'new value is ',newValue);
                })

                // 情况五：监视reactive所定义的一个响应式数据中的某些属性
                watch([()=>person.name,()=>person.age],(newValue,oldValue)=>{
                  console.log('the person’s name/age changed old value is ',oldValue,'new value is ',newValue);
                })

                // 特殊情况：监视reactive所定义的一个响应式数据中的某个属性为对象时，deep配置有效
                watch(()=>person.job,(newValue,oldValue)=>{
                    console.log('the person’s job changed old value is ',oldValue,'new value is ',newValue);
                },{deep:true})  //此处由于监测的是reactive定义的对象中的某个属性，所以deep配置有效
                function changeJob(){
                    person.job.job1.type='bounty hunter'
                }
              ```
            * ![情况五效果图，监测由reactive定义的响应式数据的多个属性时](images/监测reactive定义的一个响应式数据中的某些属性.png)
        3. 一个极为较真的情况，调用ref函数定义对象类型的响应式数据时，监视这个响应式数据有两种方式。一是调用watch函数传递要监测的属性名为参数时，写成```xxx.value```形式，因为调用ref定义的响应式数据输出后会得到RefImpl实例对象，其中存放数据的value属性的值为Proxy实例对象，说明即使调用ref函数定义了对象类型的响应式数据，内部依然会借助reactive函数来定义并生成Proxy实例对象，会自动开启深度监测，所以如果不加上.value，还要修改这个Proxy实例对象里的某个属性，因为地址值未发生改变，所以Vue不但监测不到，还会报错；二是监测的属性依旧是person，但是为其开启深度监测的配置。
            * ```
                let sum=ref(0)
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
                // 但若调用ref函数定义的是对象类型的响应式，则需要加上.value，因为用ref定义对象类型的数据，输出的是RefImpl实例对象，
                // 这个对象里包着Proxy实例对象，就需要写成person.value，这个person.value就是Proxy实例对象，会自动开启深度监测；
                // 所以若不写.value，还要修改这个Proxy实例对象里的某个属性，因为地址值未发生改变，所以Vue不但监测不到，还会报错，
                watch(person,(newValue)=>{
                    console.log('person属性的值变化了，新值为',newValue);
                },{deep:true})  // 但若坚持不写.value的话，配置deep
              ```
            * ![调用ref定义的RefImpl对象的value属性值若是Proxy实例对象，监测时需要开启深度配置](images/调用ref定义的person对象后输出的RefImpl对象，里面value属性里是Proxy实例对象.png)
            * ![调用ref定义的RefImpl对象的value属性值若是Proxy实例对象，监测时需要加上.value，这样就自动开启深度监测了](images/若用ref函数定义了对象类型的响应式数据，监测时需要写value才不报错.png)
        * 4. watchEffect函数
            * watch的套路是：既要指明监测的属性，也要指明监测的回调
            * watchEffect的套路是：不用指明监测哪个属性，监测的回调中用到哪个属性，那就监测哪个属性。
            * watchEffect指定的回到何时执行？
                * 初始化的时候执行一次；回调里所依赖/用到的数据发生变化时，执行一次
            * watchEffect有点像computed：
                * (1). 但computed注重的计算出来的值，也就是回调函数的返回值，所以必须要写返回值。
                * (2). 而watchEffect更注重过程，也就是回调函数的函数体，所以不用写返回值。
                * ```
                    function changeJob(){
                        person.job.job1.type='bounty hunter'
                    }
                    // 监测
                    watchEffect(()=>{
                        // 很智能，用了哪个属性就监测哪个属性；
                        const x1=sum.value
                        // 很智能，能够分别多层的对象
                        const jobType=person.job.job1.type
                        console.log('the callback which watchEffect assigned run',x1,jobType);
                    })
                  ```
                * ![用到哪个属性，就监测哪个，还能分别多层对象](images/很智能，watchEffect指定的回调内用到哪个属性就监测哪个；还能分别多层对象.png)
* 2.8 生命周期
    * ![Vue3生命周期图示](images/Vue3生命周期.png)
    * Vue3中可以继续使用Vue2.x中的生命周期钩子，但有两个钩子被更名
        * beforeDestroy更名为beforeUNmount
        * destroyed更名为unmounted
        * ![Vue3中配置项形式的生命周期hook的执行顺序](images/TestComp组件的创建、挂载、更新、卸载与重新挂载.png)
    * Vue3也提供了Composition API形式的生命周期钩子，与Vue2.x中钩子对应关系如下：
        * beforeCreate===>setup()
        * created========>setup()
        * beforeMount====>onBeforeMount
        * mounted========>onMounted
        * beforeUpdate===>onBeforeUpdate
        * updated========>onUpdated
        * beforeUnmount==>onBeforeUnmount
        * unmounted======>onUnmounted
        * ![组合式API形式使用生命周期hook](images/组合式API的形式使用生命周期钩子.png)
    * 值得注意的是配置项形式的beforeCreate和created，在组合式API中的写法是setup()，因为setup配置在beforeCreate钩子前执行，所以beforeCreate和created配置在组合式API中就被setup配置了。其他的hook配置在setup内是一个一个的函数，在各自的函数内指定各自的回调，且组合式API的生命周期hook会比配置项形式的生命周期hook优先执行。
* 2.9 自定义hook函数
    * 什么是hook？————本质是一个函数，把setup函数中使用的Composition API进行了封装，就是钩子放一起，hook是钩子集合。
    * 类似于Vue2.x中的mixin
    * 自定义hook的优势：复用代码，让setup中的逻辑更加清楚易懂。让组件干净整洁，只引入需要的逻辑，想要了解具体逻辑或修改逻辑，去引入的文件中查看或修改。
        * ```
            hooks/usePoint.js
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
            ...
            TestComp
            <h2>当前点击时鼠标的坐标为--x:{{point.x}};y:{{point.y}}</h2>
            // 从vue引入ref函数，watch组合式API
            import {ref} from 'vue'
            import usePoint from '../hooks/usePoint'
            export default {
                name: 'TestComp',
                setup(){
                    let sum=ref(0)
                    
                    // 调用usePoint函数，将其赋值给变量point，便于在模板中使用
                    let point=usePoint()
                    return {sum,point}
                },
            }
          ```
* 2.10 toRef
    * 作用：创建一个ref对象，其value值指向另一个对象中的某个属性
    * 语法：const name=toRef(person,'name')
    * 应用：要将响应式对象中的某个属性单独提供给外部使用时。
        * ```
            <h4>{{person}}</h4>
            <h2>姓名：{{name}}</h2>
            <h2>年龄：{{age}}</h2>
            <h2>职业：{{type}}</h2>
            <button @click="name+='~'">modify name</button>
            <button @click="age++">increase age</button>
            <button @click="changeJob">change job</button>

            // 从vue引入ref函数，watch组合式API
            import {reactive,toRef} from 'vue'
            export default {
                name: 'TestComp',
                
                setup(){
                    // 数据
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
                        // 在这了不能将hisJob作为变量修改值，报错显示是hisJob是一个常量，还是需要一步一步找到具体属性名
                        person.job.job1.type='bounty hunter'
                    }
                    return {
                        // 第一个参数：想要操作的对象，就是想要提取的属性名所在的对象；第二个参数：想要提取的属性名
                        // 这三个是把person对象里的三个属性，拆散了展示的，数据变化时仍与person对象对话
                        name:toRef(person,'name'),  // 调用toRef函数定义的ref对象，读取的是person.name赋值给name变量的
                        age:toRef(person,'age'),
                        type:toRef(person.job.job1,'type'),
                        changeJob
                    }
                }
            }
          ```
        * ![调用toRef函数，将对象中的属性生成为ref对象，且变化的数据仍与源数据对话](images/调用toRef函数，实现对象中普通属性的变为ref对象，数据变化时仍与源数据对话.png)
    * 扩展：toRefs与toRef功能一致，但可以批量创建多个ref对象，语法：toRefs(person)
        * ```
            <h4>{{person}}</h4>
            <h2>姓名：{{name}}</h2>
            <h2>年龄：{{age}}</h2>
            <!-- 用toRefs的话按照模板里的写，用toRef的话只写type -->
            <h2>职业：{{job.job1.type}}</h2>
            <button @click="name+='~'">modify name</button>
            <button @click="age++">increase age</button>
            <button @click="changeJob">change job</button>

            // 从vue引入ref函数，watch组合式API
            import {reactive,toRefs} from 'vue'
            export default {
                name: 'TestComp',
                
                setup(){
                    // 数据
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
                        // 在这了不能将hisJob作为变量修改值，报错显示是hisJob是一个常量，还是需要一步一步找到具体属性名
                        person.job.job1.type='bounty hunter'
                    }
                    return {
                        // 调用toRefs函数，批量将person对象的属性提取为ref对象，... 是因为在返回的对象里，通过...的方式将调用toRefs函数调用后生成的对象中的每一组键值对，摊在需要返回的对象内
                        ...toRefs(person),
                        changeJob
                    }
                }
            }
          ```

## 第三章、其他Composition API
* 3.1 shallowReactive与shallowRef
    * shallowReactive:只处理对象最外层属性的响应式(浅响应式)。调用ref函数将对象类型的数据变为响应式数据时，底层会帮助调用reactive函数，将其变为Proxy实例对象；但调用shallowReactive函数，传入对象类型的数据的话，不处理对象类型的响应式，在内部也不求助reactive来将对象类型处理为响应式数据
        * ![只处理最外层属性的响应式](images/shallowReactive与reactive对比，shallowReactive只处理第一层的数据为响应式.png)
    * shallowRef:只处理基本数据类型的响应式，不进行对象的响应式处理。就算传入对象类型，也只返回传入的普通对象
        * ![只处理基本数据类型的响应式，即使传递对象类型，最终返回普通对象](images/shallowRef与ref，传递基本数据为响应式时功能无区别，传递对象类型shallowRef返回的依然是普通对象.png)
    * 何时调用/使用？
        * 如果有一个对象数据，结构比较深，但变化时，只是外层属性变化==>shallowReactive
        * 如果有一个对象数据，后续功能不会修改该对象中的属性，而是生成新的对象来替换==>shallowRef，按照例子里的话，如果不会修改y中a属性的值的话，就用shallowRef，修改了的后果就是上面图示里点击按钮后，模板中呈现的是NaN
* 3.2 readonly与shallowReadonly
    * readonly:让一个响应式数据变为只读的(深只读)
    * shallowReadonly:让一个响应式数据变为只读的(浅只读)
    * 应用场景：不希望数据被修改时。
        * ![被readonly加工过的对象类型的响应式数据，不允许修改](images/readonly，被readonly加工的数据，不允许被修改.png)
        * ![被readonly加工过的基本数据类型的响应式数据，不允许修改](images/readonly，被传递基本数据类型的响应式数据.png)
        * ![被shallowReadonly加工的嵌套了的对象类型的响应式数据，深层次的数据可被修改](images/shallowReadonly，只不允许修改第一层数据，嵌套了的更深的数据可更新.png)
        * ![基本数据类型的响应式，无论是被readonly还是shallowReadonly加工，都不允许被修改](images/基本数据类型的响应式，被shallowReadonly还是readonly加工了就不允许修改.png)
* 3.3 toRaw与markRow
    * toRaw
        * 作用：将一个由reactive生成的响应式对象转为普通对象，ref生成的响应式不行。
        * 使用场景：用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，不会引起页面更新，只是呈现在页面中。
            * ![调用toRaw，将调用reactive函数生成的响应式数据转为普通对象](images/调用toRaw，将响应式数据变为普通数据.png)
    * markRow
        * 作用：标记一个对象，使其永远不会再成为响应式对象
        * 应用场景：
            * 1. 有些值不应被设置为响应式的，例如复杂的第三方类库等，如axios，日期
            * 2. 当渲染具有不可变数据源的大列表时，跳过响应式转换可以提高性能，如全国城市列表、品牌方商品列表
            * ![标记一个对象，使其永远不会成为响应式对象](images/调markRaw，将响应式数据调为普通对象，只用于呈现.png)
* 3.4 customRef
    * 作用：创建一个自定义的ref，并对其依赖项跟踪和更新触发进行显式控制。
    * 实现防抖效果：
        * ```
            <template>
                <input type="text" v-model="keyWord">
                <h3>{{keyWord}}</h3>
            </template>

            <script>
            import {customRef} from 'vue'
            export default {
                name: 'App',
                setup(){
                // 声明一个自定义的ref，名为myRef，这里传递的参数value，我传入的初始值，也就是'hello'
                function myRef (value,delay) {
                    let timer
                    // 调用customRef函数得到的数据必须要返回，否则myRef无意义
                    return customRef(  // 属于毛坯房，水电气都没通，需要自己装修
                        // 给这个回调传递两个函数参track和trigger为参数
                        (track,trigger)=>{  // 自定义的逻辑在这里写
                            // 要求必须返回对象，这一步是语法要求
                            return {
                                // 有人读取myRef中的数据时被调用
                                get(){
                                    // 模板中有几个读取的地方就调用几次get
                                    console.log(`someone read data from myRef container, I gave him ${value}`);
                                    track()  // 调用track函数，通知Vue追踪数据，value的改变，不写这一步模板无法获取最新数据(提前和get商量，让它认为这个value是有用的)
                                    return value
                                },
                                // 当有人通过页面上的v-model影响/修改内部数据时被调用，这里传递的newValue是数据更新时，需要传递的newValue，这就跟computed里的set一样
                                set(newValue){
                                    console.log(`someone updated data ${newValue} in myRef container`);
                                    clearTimeout(timer)  // 为了防止函数抖动，定时器在不停地开启关闭，不会出现因为频繁地更新数据而抖动的情况
                                    timer=setTimeout(() => {  // 延迟1000ms更新数据
                                        value=newValue  // 更新数据
                                        trigger()  // 调用trigger函数，通知Vue重新解析模板，将最新数据呈现到页面上
                                    }, delay);  // 调用myRef中作为第二个参数传递了事件，在声明myRef函数时，传递delay为形参
                                }
                            }
                        }
                    )
                }
                // let keyWord=ref('hello')  //使用Vue提供的ref，相当于精装房，可拎包入住
                let keyWord=myRef('hello',1000)  //使用程序员自定义的ref，延迟1000ms在页面更新数据
                return {keyWord}
                }
            }
            </script>
          ```
        * ![调用customRef，并写入自定义的逻辑，实现页面的呈现和数据更新导致的页面更新](images/customRef的第一个参数回调-实现页面的呈现和数据更新带来的页面更新.png)
* 3.5 provide与inject
    * 作用：实现祖孙组件间通信
    * 套路：祖先组件有一个provide选项来提供数据，后代组件有一个inject选项来开始使用这些数据
    * 具体写法：
        * ```
            祖
            setup(){
                let car=reactive({name:'玛莎拉蒂',price:'80W'})
                // 调用provide函数，给自己的后代组件传递数据，第一个参数是需要传递的数据，提供的数据名；第二个参数是真正的数据
                provide('car',car)
                return {...toRefs(car)}
            }
            ...
            后代
            setup() {
                // 调用inject函数，从祖先组件接收数据
                let car=inject('car')
                console.log('grandson',car);
                return {car}
            }
          ```
        * ![调用provide和inject，从祖先组件传递数据到后代组件](images/调用provide和inject，从祖先组件传递数据到后代组件.png)
* 3.6 响应式数据的判断
    * isRef:检查一个值是否为一个ref对象
    * isReactive:检查一个对象是否是由reactive创建额响应式代理
    * isReadonly:检查一个对象是否是由readonly创建的只读代理
    * isProxy:检查一个对象是否是由reactive或readonly方法创建的代理

## 第四章、Composition API的优势
* 4.1 Options API存在的问题--散装
    * 使用传统Options API中，新增或修改一个需求，就需要分别在data、methods、computed、watch这些配置项里增删改。下面为Options API的data、methods、computed、watch配置散装运行图示
    * ```
        <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f84e4e2c02424d9a99862ade0a2e4114~tplv-k3u1fbpfcp-watermark.image" style="width:600px;float:left" />
        <img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e5ac7e20d1784887a826f6360768a368~tplv-k3u1fbpfcp-watermark.image" style="zoom:50%;width:560px;left" /> 
      ```
* 4.2 Composition API的优势--集中式管理
    * 可以更优雅地组织代码、函数，让相关功能的代码更加有序地组织在一起，将这些数据、方法、功能点打包在一起的就是一个一个的自定义hook函数，下面为数据、方法、计算属性、监测属性集中式管理的图示
    * ```
         <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bc0be8211fc54b6c941c036791ba4efe~tplv-k3u1fbpfcp-watermark.image"style="height:360px"/>
         <img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6cc55165c0e34069a75fe36f8712eb80~tplv-k3u1fbpfcp-watermark.image"style="height:360px"/>
      ```

## 第五章、新的组件
* 5.1 Fragment
    * 在Vue2中：组件必须有一个根标签
    * 在Vue3中：组件可以没有跟标签，内部会将多个标签在一个Fragment虚拟元素中
    * 好处：减少标签层级，减少内存占用
* 5.2 Teleport
    * 什么是Teleport？--Teleport是一种能够将我们组件html结构移动到指定位置的技术
        * ```
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
          ```
        * ![to属性指向body时](images/teleport，to属性指向body时.png)
        * ![to属性指向html时](images/teleport，to属性指向html时.png)
* 5.3 Suspense
    * 等待异步组件时渲染一些额外内容，让应用有更好的用户体验
    * 使用步骤：
        * 引入异步组件
            * ```
                // 引入定义异步组件的API，defineAsyncComponent
                import {defineAsyncComponent} from 'vue'
                // 动态引入组件/异步引入组件--赋值语句，调用defineAsyncComponent函数，传递一个回调，回调需要返回调用import函数得到的返回值，调用import函数得到的返回值就是子组件ChildComp
                const Child=defineAsyncComponent(()=>import('./components/ChildComp.vue'))
              ```
        * 使用Suspense包裹组件，并配置好default和fallback，Suspense本身的底层逻辑是一种插槽，配置v-slot:default的template标签里写本来就应该展示到页面上的组件，在这里是Child；配置v-slot:fallback的template标签包裹预备的内容，可以是提醒用户稍等，正在加载中的字样，相当于懒加载。
            * ```
                <template>
                    <div class="app">
                        <h3>It is App component</h3>
                        <!-- Suspense，内置组件，本身底层逻辑是一种插槽，来包裹需要异步展示的组件 -->
                        <Suspense>
                            <!-- 包裹真正需要展示的组件，并指明插槽内是什么，v-slot:default中default代表就是本应该展示的组件 -->
                            <template v-slot:default>
                                <Child/>
                            </template>
                            <!-- 包裹预备的内容，可以认为是懒加载，用v-slot:fallback来实现 -->
                            <template v-slot:fallback>
                                <!-- <Child/> -->
                                <h3>Loading, please waiting patiently......</h3>
                            </template>
                        </Suspense>
                    </div>
                </template>
              ```
            * ![加载中](images/加载中.png)
            * ![加载成功](images/加载成功.png)
        * 补充：异步组件，顾名思义，需要等待一段时间后再展示想要展示的内容，但之前说过setup函数不能是异步函数，因为若setup是异步函数，返回的就不是对象，而是Promise实例对象。但此时因为需要使用异步函数来，配合Suspense和异步组件，setup甚至可以是一个异步函数，并且返回的是一个Promise实例对象，Promise实例对象可以等到异步函数返回成功的结果后，再进行返回。

## 第六章、其他
* 6.1 全局API的转移
    * 1. Vue2.x有许多全局API和配置
        * 例如：注册全局组件、注册全局指令等
        * ```
            // 注册全局组件
            Vue.component('MyComponent',{
                data:()=>({
                    count:0
                })
                template:'<button @click="count++">clicked {{count}} times</button>'
            })
            // 注册全局指令
            Vue.directive('focus',{
                inserted:el=>el.focus()
            })
          ```
    * 2. Vue3.0中对这些API做出了调整
        * 将全局的API做出了调整，即：Vue.xxx调整到应用实例(app)上
        * ![Vue3的全局API和Vue2的全局API对比](images/Vue3的全局API和Vue2的全局API对比图.png)
* 6.2 其他改变
    * data选项应始终被声明为一个函数
    * 过渡类名的更改：
        * Vue2.x写法
            * ```
                .v-enter,
                .v-leave-to{
                    opacity:0;
                }
                .v-leave,
                .v-enter-to{
                    opacity:1;
                }
              ```
        * Vue3.x写法
            * ```
                .v-enter-from,
                .v-leave-to{
                    opacity:0;
                }
                .v-leave-from,
                .v-enter-to{
                    opacity:1;
                }
              ```
    * 移除keyCode作为v-on的修饰符，同时也不再支持config.keyCodes
    * 移除v-on.native修饰符
        * 父组件中绑定事件
            * ```
                <MyComponent
                    v-on:close="handleComponentEvent"
                    v-on:click="handleNativeClickEvent"
                />
              ```
        * 子组件中声明自定义事件
            * ```
                <script>
                    export default{
                        emits:['close']
                    }
                </script>
              ```
    * 移除过滤器(filter)
        * 过滤器虽然看起来很方便，但它需要一个自定义语法，打破大括号内表达式是“只是JavaScript”的假设，这不仅有学习成本，而且有实现成本。建议用方法调用或家孙属性去替换过滤器。


# # 总结
* 就是把Osborn创建为一个对象了，然后把值给了value，给value绑定了响应式
* 数据劫持才是响应式的根基
* Proxy 相比于 defineProperty 的优点就在于直接监听整个对象，以及能够监听通过数组方法新增的元素
* 修改基本类型数据用ref函数，修改对象类型(对象和数组)数据用reactive函数
* Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。
* 调用两次Object.defineProperty()对同一个属性进行增删改查肯定不可能实现后面覆盖前面的，因为 get 和 set 都是回调函数，只有你读取或者修改才能被执行
* 还有一直情况就是Object和Reflect同时存在，优先显示Object的，无论顺序
* 对于框架封装来说，Reflect比Object相对来说更友好
* Vue3会把用props接收到的数据，整理成一个Proxy实例对象，这样子组件接收到的数据，都是响应式的数据
* watch监听的是实现响应式的代理结构，而不是数据源本身，所以监测的不应该是RefImpl.value，而是RefImpl实例对象
* watch是指哪打哪，watchEffect是打哪指哪
* name是新值，新定义的变量，独立的内存空间，就算被p.name赋值，也没有proxy的监视
* 程序员亲自xxx.xxx并赋值给一个变量的不是响应式数据，那只是基本数据或普通对象
* 页面没有变化有两种情况：1. 数据变化了，但数据不是响应式的，就像声明一个变量，将响应式数据里的一个属性赋值给变量一样，变量值变出花来，Vue没有监测到，那页面就不会有变化；2. 数据没有发生变化，也就是数据不允许被修改
* 防抖：一定时间后再执行回调函数，期间被重新触发时则重新计时
* data选项为什么一个呗声明为函数？防止组件在复用的时候产生数据关联关系，从而导致干扰