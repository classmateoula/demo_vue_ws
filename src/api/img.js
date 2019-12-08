import { axios } from './index'

// 获取收藏图片
export function get_img_list (data) {
  return axios({
    method: 'POST',
    url: '/get/img/list',
    data
  })
}

// 新增收藏图片
export function post_img_add (data) {
  return axios({
    method: 'POST',
    url: '/post/img/add',
    data
  })
}
