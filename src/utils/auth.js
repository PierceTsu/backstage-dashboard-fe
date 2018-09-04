import Cookies from 'js-cookie'
const loginKey = 'flag'
const userKey = 'currentUser'

export function getToken () {
  return Cookies.get(loginKey)
}

export function setToken () {
  return Cookies.set(loginKey, '1')
}

export function removeToken () {
  return Cookies.remove(loginKey)
}

export function setUserInfo (userInfo) {
  return Cookies.set(userKey, userInfo)
}

export function getUserInfo () {
  return JSON.parse(Cookies.get(userKey))
}

export function removeUserInfo () {
  return Cookies.remove(userKey)
}
