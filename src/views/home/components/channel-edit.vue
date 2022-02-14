<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <!-- 表头 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        class="edit-btn"
        round
        type="danger"
        size="mini"
        plain
        @click="isEdit = !isEdit"
      >
        {{ isEdit ? "完成" : "编辑" }}
      </van-button>
    </van-cell>
    <!-- 频道item-->
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(obj, index) in myChannels"
        :key="index"
        to=""
        @click="onClickChannel(index, obj)"
      >
        <van-icon slot="icon" name="clear" v-if="isEdit"> </van-icon>
        <span slot="text" class="text" :class="{ active: index === active }">
          {{ obj.name }}
        </span>
      </van-grid-item>
    </van-grid>

    <!-- 推荐频道 -->
    <!-- 表头 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">推荐频道</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(obj, index) in recommendChannels"
        :key="index"
        icon="plus"
        :text="obj.name"
        @click="addChannel(obj)"
      >
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import {
  getAllChannels,
  addUserChannels,
  deleteUserChannel
} from '@/api/channels.js'
import { setItem } from '@/utils/storage.js'
import { mapState } from 'vuex'
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    myChannels: {
      type: Array,
      require: true
    },
    active: {
      type: Number,
      require: true
    }
  },
  data () {
    return {
      allChannels: [],
      isEdit: false,
      fiexdChannels: [0] // 固定频道不能删除
    }
  },
  computed: {
    ...mapState(['user']),
    // 计算属性，获取推荐列表
    recommendChannels () {
      // this.allChannels.forEach((channel) => {
      //   const ret = this.myChannels.find((mychannel) => {
      //     return mychannel.id === channel.id;
      //   });

      //   if (!ret) {
      //     channels.push(channel);
      //   }
      // });
      // return channels;
      return this.allChannels.filter((channel) => {
        return (
          this.myChannels.findIndex((myChannel) => {
            return myChannel.id === channel.id
          }) === -1
        )
      })
    }
  },
  watch: {},
  created () {
    // 加载所有频道列表
    this.LoadingAllChannel()
  },
  mounted () {},
  methods: {
    // 获取所有频道列表
    async LoadingAllChannel () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
      // console.log(this.allChannels);
      // console.log(this.myChannels);
      // console.log(this.recommendChannels);
    },
    // 编辑频道按钮
    // 删除频道列表
    onClickChannel (index, obj) {
      // isEdit 为true 则允许编辑
      if (this.isEdit) {
        // 固定频道不能删除
        if (this.fiexdChannels.includes(obj.id)) {
          return
        }
        // 删除频道
        this.myChannels.splice(index, 1)

        if (index <= this.active) {
          this.$emit('updata-active', this.active - 1, true)
          console.log('----')
        }
        // 4、处理删除频道持久化
        this.deleteChannel(obj)
      } else {
        this.$emit('updata-active', index, false)
        console.log('+++')
      }
    },
    async deleteChannel (obj) {
      try {
        if (this.user) {
          await deleteUserChannel(obj.id)
          console.log('线上删除成功')
        } else {
          setItem('TOUTIAO_CHANNELS', this.myChannels)
          console.log('本地删除成功')
        }
      } catch (error) {
        this.$toast('添加失败请稍后重试')
      }
    },

    // 添加频道列表
    async addChannel (obj) {
      this.myChannels.push(obj)
      // 数据持久化处理
      if (this.user) {
        // 已登录存储到线上，调用接口
        try {
          await addUserChannels({
            id: obj.id,
            seq: this.myChannels.length
          })
          console.log('添加成功了')
        } catch (error) {
          this.$toast('添加失败了')
        }
      } else {
        console.log(this.user + 'ssss')
        // 未登录存储到本地
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding: 85px 0;

  .title-text {
    font-size: 32px;
    color: #333333;
  }

  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }

  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }

  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }
  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
