import {setToken, removeToken, setUserInfo, removeUserInfo} from '../../utils/auth'
import {login, logout} from '../../api/auth'

const user = {
  state: {},
  actions: {
    Login ({commit}, loginForm) {
      return new Promise((resolve, reject) => {
        login(loginForm).then(res => {
          if (res.status === 0) {
            setToken()
            setUserInfo({userId: res.data.userId, nickname: res.data.nickname})
            localStorage.setItem('routers', JSON.stringify(res.data.routers))
          }
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    LogOut ({commit}) {
      return new Promise((resolve) => {
        logout({
          url: 'auth/logout',
          method: 'post'
        }).then(data => {
          removeToken()
          removeUserInfo()
          resolve(data)
        }).catch(() => {
          removeToken()
          removeUserInfo()
        })
      })
    },
    FedLogOut ({commit}) {
      return new Promise(resolve => {
        commit('RESET_USER')
        resolve()
      })
    }
  },
  mutations: {
    RESET_USER: (state) => {
      removeToken()
      removeUserInfo()
    }
  }
}
export default user
