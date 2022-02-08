<template>
  <div id="app">
    <!-- 路由出口 -->
    <router-view />
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

<style lang="less">
.box {
  width: 200px;
  height: 100px;
  background-color: pink;
}
</style>
