import api from './axios'
var querystring = require('querystring')

export const listResource = (params) => {
  return api({
    url: '/resource/getByRouterId',
    method: 'post',
    data: querystring.stringify(params)
  })
}

export const listAvailableResourceTree = (params) => {
  return api({
    url: '/resource/tree',
    method: 'get'
  })
}

export const saveResource = (params) => {
  return api({
    url: '/resource/add',
    method: 'post',
    data: querystring.stringify(params)
  })
}

export const updateResource = (params) => {
  return api({
    url: '/resource/update',
    method: 'post',
    data: querystring.stringify(params)
  })
}

export const removeResource = (params) => {
  return api({
    url: '/resource/remove',
    method: 'post',
    data: querystring.stringify(params)
  })
}
