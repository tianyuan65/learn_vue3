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
        * (2). setup不能是一个async函数，因为返回值不再是return的对象，而是promise，模板看不到return对象中的属性
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


## 第三章、其他Composition API
## 第四章、Composition API的优势
## 第五章、新的组件
## 第六章、其他


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