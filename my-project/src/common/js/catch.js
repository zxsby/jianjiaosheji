// 操作 保存 storage
import stroage from 'good-storage'

const CART_LEY = '_cart_'  // 购物车
const PRODUCT_COLLECT = '_productCollect_'  //  商品收藏
// const SEARCH_KEY = '_search_' //  搜索历史
// const SEARCH_MAX_LENGTH = 15  //  最大搜索记录保存长度

//  检验购物车是否已经存在该数据并整合插入
//  compare比较函数
function inscrtCart(arr, val, compare) {
  let index = arr.findIndex(compare)
  if (index >= 0) {
    arr[index].count += val.count
  } else {
    arr.unshift(val)
  }
}
//  添加购物车保存到本地
export function joinCart(query) {
  let cart = stroage.get(CART_LEY, [])
  inscrtCart(cart, query, (item) => {
    return item.detail.productId === query.detail.productId
  })
  stroage.set(CART_LEY, cart)
  return cart
}

//  开始从本地读取购物车数据
export function loadCart() {
  return stroage.get(CART_LEY, [])
}

//   验证收藏是否存在并判断是否插入
function insertCollect(arr, val, compare) {
  let index = arr.findIndex(compare)
  if (index >= 0) {
    arr.splice(index, 1)
  } else {
    arr.push(val)
  }
}

//  添加到商品收藏
export function joinProductCollect(query) {
  let collect = stroage.get(PRODUCT_COLLECT, [])
  insertCollect(collect, query, (item) => {
    return item.parentProductId === query.parentProductId
  })
  stroage.set(PRODUCT_COLLECT, collect)
  return collect
}

//  从本地读取商品收藏数据

export function loadProductCollect() {
  return stroage.get(PRODUCT_COLLECT, [])
}

//  修改购物车

// export function changeCartList(arrList) {
//   let cartList = stroage.get(CART_LEY, [])
//   for (let i = 0; i < arrList.length; i++) {
//     let index = cartList.findIndex((item) => {
//       return item.detail.productId === arrList[i].productId
//     })
//     if (arrList[i].count === 0) {
//       cartList.splice(index, 1)
//     } else {
//       cartList[index].count = arrList[i].count
//     }
//   }
//   stroage.set(CART_LEY, cartList)
//   return cartList
// }

export function changeCartList(product) {
  let cartList = stroage.get(CART_LEY, [])
  let index = cartList.findIndex((item) => {
    return item.detail.productId === product.productId
  })
  cartList[index].count = product.count
  stroage.set(CART_LEY, cartList)
  return cartList
}
