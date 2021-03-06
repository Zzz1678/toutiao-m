import Vue from 'vue'
// 引入路由组件
import VueRouter from 'vue-router'
// 在vue中注册路由组件
Vue.use(VueRouter)
// 配置自己的路由表(路由规则)
const routes = [{
  path: '/login',
  name: 'login',
  component: () =>
    import('@/views/login')
},

{
  path: '', // 默认子路由只能有一个
  // name: "layout", //子路由有默认的选中模块则父路由的name无效
  component: () =>
    import('@/views/layout'),
  children: [{
    path: '', // 默认子路由只能有一个
    name: 'home',
    component: () =>
      import('@/views/home')
  },
  {
    path: 'qa',
    name: 'qa',
    component: () =>
      import('@/views/qa')
  }, {
    path: 'video',
    name: 'video',
    component: () =>
      import('@/views/video')
  }, {
    path: 'my',
    name: 'my',
    component: () =>
      import('@/views/my')
  }
  ]
},
{
  path: '/search',
  name: 'search',
  component: () =>
    import('@/views/search')

}

]
// 创建路由对象并加载路由表
const router = new VueRouter({
  routes
})

export default router
