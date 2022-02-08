import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'
Vue.use(Vuex)

const TOKEN_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
  state: {
    // user: null //用于保存当前登录的用户数据
    user: getItem(TOKEN_KEY)
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // 为了防止刷新丢失，我们需要吧token存储到本地
      // 本地存储只能存字符串，需要将json格式的数据对象转化为string格式：JSON.stringify(obj)
      setItem(TOKEN_KEY, state.user)
    }

  },
  actions: {},
  modules: {}
})
