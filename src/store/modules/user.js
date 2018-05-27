import {getTopMenu, getSideMenu} from '../../api/user'

const user = {
  state: {
    topMenu: [],
    sideMenu: []
  },
  actions: {
    GetTopMenu ({commit}) {
      return new Promise(resolve => {
        getTopMenu().then((res) => {
          const data = res.data
          commit('SET_TOP_MENU', data)
          resolve(data)
        })
      })
    },
    GetSideMenu ({commit}, parentId) {
      return new Promise(resolve => {
        getSideMenu(parentId).then((res) => {
          const data = res.data
          commit('SET_SIDE_MENU', data)
          resolve(data)
        })
      })
    }
  },
  mutations: {
    SET_TOP_MENU: (state, topMenu) => {
      console.log('top', topMenu)
      state.topMenu = topMenu
    },
    SET_SIDE_MENU: (state, sideMenu) => {
      console.log('side-action', sideMenu)
      state.sideMenu = sideMenu
    }
  }
}
export default user
