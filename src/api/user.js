import {topMenu, sideMenu} from '../mock/menu'

export const getSideMenu = (parentId) => {
  return new Promise((resolve, reject) => {
    resolve({ data: sideMenu[parentId] })
  })
}

export const getTopMenu = () => {
  return new Promise((resolve, reject) => {
    resolve({ data: topMenu })
  })
}
