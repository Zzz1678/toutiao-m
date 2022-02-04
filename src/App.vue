<template>
  <div id="app">
    <!-- 路由出口 -->
    <router-view />
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      msg: '少时诵诗书'
    }
  }
}
</script>

<style lang="less" scoped>
</style>
