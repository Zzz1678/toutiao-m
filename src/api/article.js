import request from '@/utils/request'
// 获取文章推荐列表
export const getArticles = params => {
  return request({
    methods: 'get',
    url: '/v1_0/articles',
    params
  })
}
