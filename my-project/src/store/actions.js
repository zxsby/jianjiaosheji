import * as types from './mutations-types'
import {joinCart, joinProductCollect, changeCartList} from '../common/js/catch'

// 加入购物车
export const joinToCart = function ({commit}, productDetail) {
  commit(types.SET_JOIN_CART, joinCart(productDetail))
}

// 购物车操作商品个数增加和减少
export const changeCartDetailCount = function ({commit}, product) {
  commit(types.SET_JOIN_CART, changeCartList(product))
}

// export const changeCart = function ({commit}, arrList) {
//   commit(types.SET_JOIN_CART, changeCartList(arrList))
// }

//  加入商品收藏
export const joinPcl = function ({commit}, Product) {
  commit(types.SET_PRODUCT_COLLECT, joinProductCollect(Product))
}
