// 操作 保存 storage
import stroage from 'good-storage'

const CART_LEY = '_cart_'  // 购物车
const PRODUCT_COLLECT = '_productCollect_'  //  商品收藏
const SEARCH_KEY = '_search_' //  搜索历史
const SEARCH_MAX_LENGTH = 15  //  最大搜索记录保存长度

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
    return item.productId === query.productId
  })
  stroage.set(PRODUCT_COLLECT, collect)
  return collect
}

//  从本地读取商品收藏数据

export function loadProductCollect() {
  return stroage.get(PRODUCT_COLLECT, [])
}

//  修改购物车 单个数量

export function changeCartList(product) {
  let cartList = stroage.get(CART_LEY, [])
  let index = cartList.findIndex((item) => {
    return item.detail.productId === product.productId
  })
  cartList[index].count = product.count
  stroage.set(CART_LEY, cartList)
  return cartList
}

// 删除购物车选中商品

export function cartDetail(productArr) {
  let cartList = stroage.get(CART_LEY, [])
  for (let val of productArr) {
    cartList.splice(cartList.findIndex((item) => {
      return item.detail.productId === val
    }), 1)
  }
  stroage.set(CART_LEY, cartList)
  return cartList
}

// 验证搜索历史是否已经存在，以及最大长度为15
function insertHistory(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

//  搜索历史的保存
export function joinSearch(historyText) {
  let searches = stroage.get(SEARCH_KEY, [])
  insertHistory(searches, historyText, (item) => {
    return item === historyText
  }, SEARCH_MAX_LENGTH)
  stroage.set(SEARCH_KEY, searches)
  return searches
}

// 删除单个搜索历史

export function detailOneSearch(historyText) {
  let searches = stroage.get(SEARCH_KEY, [])
  let index = searches.findIndex((item) => {
    return item === historyText
  })
  searches.splice(index, 1)
  stroage.set(SEARCH_KEY, searches)
  return searches
}

export function loadSearchHistory() {
  return stroage.get(SEARCH_KEY, [])
}
