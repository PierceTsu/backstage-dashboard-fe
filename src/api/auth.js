import api from './axios'
var querystring = require('querystring')

export const login = (params) => {
  return api({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    url: '/auth/login',
    method: 'post',
    data: querystring.stringify(params)
  })
}

export const logout = () => {
  return api({
    url: '/auth/logout',
    method: 'get'
  })
}

export const getPermissionList = (params) => {
  return api({
    url: '/auth/permissionList',
    method: 'post',
    data: querystring.stringify(params)
  })
}
