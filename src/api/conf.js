import api from './axios'
// var querystring = require('querystring')

// 获取平台筛选条件
export const getPlatform = () => {
  return api({
    url: '/conf/platform',
    method: 'get'
  })
}
// 获取获客行为筛选条件
export const getAcquireAction = () => {
  return api({
    url: '/conf/acquireAction',
    method: 'get'
  })
}
// 获取渠道筛选条件
export const getChannel = () => {
  return api({
    url: '/conf/channel',
    method: 'get'
  })
}
