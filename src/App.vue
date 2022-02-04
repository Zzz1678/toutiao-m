<template>
  <div id="app">
    <!-- 路由出口 -->
    <router-view />
    <h1>{{ msg }}</h1>
    <i class="toutiao toutiao-dianzan2"></i>
    <div>
      <i class="toutiao toutiao-dianzan2"></i>
      <van-button type="primary">主要按钮</van-button>
      <van-button type="info">信息按钮</van-button>
      <van-button type="default">默认按钮</van-button>
      <van-button type="warning">警告按钮</van-button>
      <van-button type="danger">危险按钮</van-button>
    </div>
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
