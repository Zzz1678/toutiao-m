import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入vant组件(全局引入)
import Vant from 'vant'
import 'vant/lib/index.css'

// 引入 amfe-flexible 配置rem适配
import 'amfe-flexible'
// 加载全局样式：
import './styles/index.less'
import './utils/dayjs'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
