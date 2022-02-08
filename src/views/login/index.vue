<template>
  <div class="login-container">
    <van-nav-bar class="page-nav-bar" title="登录">
      <van-icon slot="left" name="cross" @click="$router.back()" />
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="abc">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号码"
        :rules="userRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入短信验证码"
        :rules="userRules.code"
        type="bumber"
        maxlength="6"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"> </i>
        <template #button>
          <van-count-down
            :time="time"
            format="ss 秒"
            v-if="isCountDown"
            @finish="isCountDown = false"
          />
          <van-button
            v-else
            class="send-sms-btn"
            round
            size="small"
            type="default"
            @click="sendSmsCode"
          >
            发送验证码
          </van-button>
        </template>
      </van-field>
      <div style="margin: 16px" class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      userRules: {
        mobile: [
          {
            required: true,
            message: '手机号码不能为了空'
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: '手机号码格式错误'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      },
      time: 10000,
      isCountDown: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 点击登录函数
    async onSubmit () {
      // 1、获取表单数据
      // const user = this.user;
      // 2、表单验证
      // 3、提示：在组件中必须通过 this.$Toast 来调用
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 默认持续时间 默认是2秒 ，如果为0则持续展示
      })
      // 发送登录请求
      try {
        const { data } = await login(this.user)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')
        // 登录成功返回原来的页面
        // 但是back这种方式不严谨
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或者密码错误')
        } else {
          this.$toast.fail('登录失败，请稍后重试')
        }
      }
    },
    // 发送验证码函数
    async sendSmsCode () {
      // 1、校验手机号
      try {
        await this.$refs.abc.validate('mobile')
      } catch (error) {
        return console.log('验证失败', error)
      }
      // console.log("少时诵诗书");
      // 2、 验证通过开始倒计时
      this.isCountDown = true
      // 3、 发送验证码
      try {
        const res = await sendSms(this.user.mobile)
        console.log('发送验证码成功', res)
        this.$toast.success('验证码发送成功')
      } catch (error) {
        // 发送失败重新倒计时
        this.isCountDown = false
        if (error.response.status === 429) {
          this.$toast.fail('发送太频繁了,请稍后重试')
        } else {
          this.$toast.fail('发送失败!')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }

  .send-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }

  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
