import api from './axios'
var querystring = require('querystring')

export const listUser = (params) => {
  return api({
    url: '/user/list',
    method: 'post',
    data: querystring.stringify(params)
  })
}

export const addUser = (params) => {
  return api({
    url: '/user/add',
    method: 'post',
    data: params
  })
}

export const updateUser = (params) => {
  return api({
    url: '/user/update',
    method: 'post',
    data: params
  })
}

export const removeUser = (params) => {
  return api({
    url: '/user/remove',
    method: 'post',
    data: querystring.stringify(params)
  })
}

export const getUser = (id) => {
  return api({
    url: '/user/' + id,
    method: 'get'
  })
}

export const changePassword = (params) => {
  return api({
    url: '/user/changePwd',
    method: 'post',
    data: querystring.stringify(params)
  })
}
