import api from './axios'
var querystring = require('querystring')

export const listAllRouter = () => {
  return api({
    url: '/router/tree',
    method: 'get'
  })
}

export const listRouter = (params) => {
  return api({
    url: '/router/list',
    method: 'post',
    data: querystring.stringify(params)
  })
}

export const listParentRouter = () => {
  return api({
    url: '/router/root',
    method: 'get'
  })
}

export const saveRouter = (params) => {
  return api({
    url: '/router/add',
    method: 'post',
    data: querystring.stringify(params)
  })
}

export const updateRouter = (params) => {
  return api({
    url: '/router/update',
    method: 'post',
    data: querystring.stringify(params)
  })
}

export const removeRouter = (params) => {
  return api({
    url: '/router/remove',
    method: 'post',
    data: querystring.stringify(params)
  })
}
