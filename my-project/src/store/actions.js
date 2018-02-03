import * as types from './mutations-types'
import {joinCart, joinProductCollect} from '../common/js/catch'

export const joinToCart = function ({commit}, productDetail) {
  commit(types.SET_JOIN_CART, joinCart(productDetail))
}

export const joinPcl = function ({commit}, Product) {
  commit(types.SET_PRODUCT_COLLECT, joinProductCollect(Product))
}
