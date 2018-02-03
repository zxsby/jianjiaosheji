import {loadCart, loadProductCollect} from '../common/js/catch'

const state = {
  cart: loadCart(),
  productCollect: loadProductCollect()
}

export default state
