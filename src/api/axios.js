import axios from 'axios'
import Message from 'element-ui'
import store from '../store'

axios.defaults.timeout = 30000

// request拦截器
axios.interceptors.request.use(
  config => {
    return config
  }, error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// response拦截器
axios.interceptors.response.use(
  response => {
    const res = response.data
    if (res.status === 11) {
      store.dispatch('FedLogOut').then(() => {
        location.reload()// 重新实例化vue-router
      })
      return
    }
    return response.data
  }, error => {
    console.error('err', error)
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default axios
