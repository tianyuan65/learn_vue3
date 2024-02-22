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

## 第一章、创建Vue3.
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
        * 3. 真正的按需编译，不再等待整个应用遍已完成
    * 传统构建与vite构建对比图
        * 图找不到，在尚硅谷138课看吧
        * 1. 创建工程，npm init vite-app <project-name>
        * 2. 进入工程目录，cd <project-name>
        * 3. 安装依赖，npm install
        * 4. 运行，npm run dev
## 第二章、常用Composition API
## 第三章、其他Composition API
## 第四章、Composition API的优势
## 第五章、新的组件
## 第六章、其他