import api from './axios'
var querystring = require('querystring')

// 获取所有可用的角色
export const listAllRole = (params) => {
  return api({
    url: '/role/all',
    method: 'get',
    data: querystring.stringify(params)
  })
}

export const listRole = (params) => {
  return api({
    url: '/role/list',
    method: 'post',
    data: querystring.stringify(params)
  })
}

export const addRole = (params) => {
  return api({
    url: '/role/add',
    method: 'post',
    data: querystring.stringify(params)
  })
}

export const updateRole = (params) => {
  return api({
    url: '/role/update',
    method: 'post',
    data: querystring.stringify(params)
  })
}

export const removeRole = (params) => {
  return api({
    url: '/role/remove',
    method: 'post',
    data: querystring.stringify(params)
  })
}

export const listPermissions = (params) => {
  return api({
    url: '/role/permissions',
    method: 'post',
    data: querystring.stringify(params)
  })
}

export const savePermission = (params) => {
  return api({
    url: '/role/savePermissions',
    method: 'post',
    data: params
  })
}
