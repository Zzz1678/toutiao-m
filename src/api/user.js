import request from '@/utils/request'
// import store from '@/store'

export const login = data => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data
  })
}
// 发送验证码
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}
// 获取用户信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: 'v1_0/user'
    // headers: {
    //     Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}
