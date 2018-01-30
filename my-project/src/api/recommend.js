import jsonp from '../common/js/jsonp'
const option = {
  param: 'jsonpCallback'
}
export function getRcommend() {
  const url = 'https://m.wowdsgn.com/v2/page'
  const data = Object.assign({}, {
    pageId: 1,
    tabId: 1,
    _: 1516605155486
  })
  return jsonp(url, data, option)
}
