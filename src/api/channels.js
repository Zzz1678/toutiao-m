import request from '@/utils/request'

// 用户获取所有频道列表
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/channels'
  })
}

// 添加用户频道接口，给已登录用户设置频道
export const addUserChannels = channel => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })
}

// 删除用户频道接口，给已登录用户设置频道
export const deleteUserChannel = tar => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${tar}`
  })
}
