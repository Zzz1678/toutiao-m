<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        to="/search"
        >搜索呀
      </van-button>
    </van-nav-bar>
    <!-- 导航标签 -->
    <van-tabs class="channel-tabs" v-model="active">
      <van-tab v-for="obj in channels" :key="obj.id" :title="obj.name">
        <!--文章列表 -->
        <ArticleList :channel="obj" />
      </van-tab>

      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn" @click="showPopup">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
      <!-- 弹出层 -->
      <van-popup
        v-model="show"
        position="bottom"
        closeable
        close-icon-position="top-left"
        :style="{ height: '100%' }"
      >
        <ChannelEdit
          :myChannels="channels"
          :active="active"
          @updata-active="onUpdateActive"
        />
      </van-popup>
    </van-tabs>
  </div>
</template>

<script>
import ArticleList from './components/aritcle-list.vue'
import ChannelEdit from './components/channel-edit.vue'
import { getUserChannels } from '@/api/user'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'

export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  props: {},
  data () {
    return {
      active: 0,
      channels: [], // 导航栏列表(也就是编辑页中的频道列表)
      show: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    this.loadChannels()
  },
  mounted () {},
  methods: {
    async loadChannels () {
      // 如果登录，则从服务器拿，若没登录则从本地拿
      // 判断this.user是否为空 为空===未登录   有数据 === 已登录
      if (this.user) {
        try {
          // 获取频道列表
          const { data } = await getUserChannels()
          this.channels = data.data.channels
          console.log('从服务器获取了')
        } catch (err) {
          this.$toast('获取频道列表失败')
        }
      } else {
        this.channels = getItem('TOUTIAO_CHANNELS')
        if (this.channels === null) {
          const { data } = await getUserChannels()
          this.channels = data.data.channels
        }
      }
    },
    showPopup () {
      this.show = true
    },
    onUpdateActive (num, show) {
      this.active = num
      this.show = show
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  padding-top: 87px;
  padding-bottom: 50px;
  .van-nav-bar__title {
    max-width: unset;
  }

  .search-btn {
    width: 450px;
    height: 65px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
  /deep/ .channel-tabs {
    .van-tab__wrap {
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 82px;
    }
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      font-size: 30px;
      color: #777777;
    }

    .van-tab--active {
      color: #333333;
    }

    .van-tabs__nav {
      padding-bottom: 0;
    }

    .van-tabs__line {
      bottom: 8px;
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
    }
  }

  .placeholder {
    flex-shrink: 0;
    width: 66px;
    height: 82px;
  }

  .hamburger-btn {
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 66px;
    height: 82px;
    background-color: #fff;
    background-color: rgba(255, 255, 255, 0.902);
    i.toutiao {
      font-size: 33px;
    }
    &:before {
      content: "";
      position: absolute;
      left: 0;
      width: 1px;
      height: 58px;
      background-image: url(~@/assets/gradient-gray-line.png);
      background-size: contain;
    }
  }
}
</style>
