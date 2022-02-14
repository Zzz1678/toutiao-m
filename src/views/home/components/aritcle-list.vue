<template>
  <div class="article-list">
    <!-- 文章列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <AritcleItems
        v-for="(article, index) in list"
        :key="index"
        :article="article"
      >
      </AritcleItems>
    </van-list>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import AritcleItems from '@/components/article-item'
export default {
  name: 'ArticleList',
  components: {
    AritcleItems
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [], // 文章列表数据
      loading: false, // 上拉加载更多的 loading 状态
      finished: false, // 是否加载结束
      error: false, // 是否加载失败
      timestamp: null // 请求下一页数据的时间戳
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 当触发上拉加载更多的时候调用该函数
    async onLoad () {
      try {
        // 1. 请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道 id
          timestamp: this.timestamp || Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
          with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })

        // 2. 把数据添加到 list 数组中
        const { results } = data.data
        // console.log(data.data);
        this.list.push(...results)

        // 3. 设置本次加载中 loading 状态结束
        this.loading = false

        // 4. 判断数据是否加载结束
        if (results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          // 没有数据了，设置加载状态结束，不再触发上拉加载更多了
          this.finished = true
        }
      } catch (err) {
        console.log(err)
        this.loading = false // 关闭 loading 效果
        this.error = true // 开启错误提示
      }
    }
  }
}
</script>

<style scoped lang="less">
.article-list {
  position: fixed;
  top: 180px;
  bottom: 100px;
  right: 0;
  left: 0;
  overflow-y: auto;
}
</style>
