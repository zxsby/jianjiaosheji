import orginJsonp from 'jsonp'

export default function jsonp(url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return new Promise((resolve, reject) => {
    orginJsonp(url, option, (err, data) => {
      console.log(url, option)
      if (!err) {
        console.log(1)
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

function param(data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += `&${k}=${value}`
  }
  return url ? url.substring(1) : ''
}
