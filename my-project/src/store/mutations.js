import * as types from './mutations-types'
const mtutaions = {
  [types.SET_JOIN_CART] (state, cart) {
    state.cart = cart
  },
  [types.SET_PRODUCT_COLLECT] (state, collect) {
    state.productCollect = collect
  }
}

export default mtutaions
