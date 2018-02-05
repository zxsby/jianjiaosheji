import {loadCart, loadProductCollect, loadSearchHistory} from '../common/js/catch'

const state = {
  cart: loadCart(),
  productCollect: loadProductCollect(),
  history: loadSearchHistory()
}

export default state
