import * as types from './mutations-types'
import {joinCart, joinProductCollect, changeCartList, cartDetail, joinSearch, detailOneSearch} from '../common/js/catch'

// 加入购物车
export const joinToCart = function ({commit}, productDetail) {
  commit(types.SET_JOIN_CART, joinCart(productDetail))
}

// 购物车操作商品个数增加和减少
export const changeCartDetailCount = function ({commit}, product) {
  commit(types.SET_JOIN_CART, changeCartList(product))
}
// 删除购物车数据

export const detailCartItem = function ({commit}, arrList) {
  commit(types.SET_JOIN_CART, cartDetail(arrList))
}

//  加入商品收藏
export const joinPcl = function ({commit}, Product) {
  commit(types.SET_PRODUCT_COLLECT, joinProductCollect(Product))
}

// 搜索历史保存

export const joinSearchHistory = function ({commit}, historyText) {
  commit(types.SET_SEARCH_HISTORY, joinSearch(historyText))
}

// 删除单个搜索历史

export const detailOneSearchHistory = function ({commit}, historyText) {
  commit(types.SET_SEARCH_HISTORY, detailOneSearch(historyText))
}
