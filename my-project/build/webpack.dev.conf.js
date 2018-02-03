'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const express = require('express')
const axios = require('axios')
const app = express()
let apiRoutes = express.Router()
app.use('/api', apiRoutes)
let appData = require('../data.json')
let recommend = appData.recommend


const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap, usePostCSS: true})
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: process.env.HOST || config.dev.host,
    port: process.env.PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay ? {
      warnings: false,
      errors: true,
    } : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    before(app) {
      //  获取首页推荐页数据
      app.get('/api/recommend', (req, res) => {
        // res.json(recommend)
        axios.get('https://m.wowdsgn.com/v2/page?pageId=1&tabId=1&_=1517196246075', {
          headers: {
            referer: 'https://m.wowdsgn.com/',
            host: 'm.wowdsgn.com'
          }
        }).then((response) => {
          res.json(response.data)
        }).catch((err) => {
          console.log(err)
        })
      })
      //  获取首页家具页数据
      app.get('/api/furniture', (req, res) => {
        // res.json(recommend)
        axios.get('https://m.wowdsgn.com/v2/page?pageId=1&tabId=10005&_=1517213531805', {
          headers: {
            referer: 'https://m.wowdsgn.com/',
            host: 'm.wowdsgn.com'
          }
        }).then((response) => {
          res.json(response.data)
        }).catch((err) => {
          console.log(err)
        })
      })
      //  获取首页家居页数据
      app.get('/api/home', (req, res) => {
        // res.json(recommend)
        axios.get('https://m.wowdsgn.com/v2/page?pageId=1&tabId=10006&_=1517288480575', {
          headers: {
            referer: 'https://m.wowdsgn.com/',
            host: 'm.wowdsgn.com'
          }
        }).then((response) => {
          res.json(response.data)
        }).catch((err) => {
          console.log(err)
        })
      })
      //  获取首页活动页数据
      app.get('/api/activity', (req, res) => {
        // res.json(recommend)
        axios.get('https://m.wowdsgn.com/v2/page?pageId=1&tabId=10010&_=1517290711784', {
          headers: {
            referer: 'https://m.wowdsgn.com/',
            host: 'm.wowdsgn.com'
          }
        }).then((response) => {
          res.json(response.data)
        }).catch((err) => {
          console.log(err)
        })
      })
      // 获取productGroup页面数据先获取详细数据后是图片数据，组合后返回
      app.get('/api/productGroup', (req, res) => {
        // res.json(recommend)
        console.log(req.query)
        var url = `https://m.wowdsgn.com/pages/productGroup/${req.query.id}/products?pageNumber=${req.query.pageNumber}&_=1517297374343`
        var imgUrl = `https://mobile-api.wowdsgn.com/v1/product/group?paramJson={%22groupId%22:${req.query.id}}`
        var output = ''
        axios.get(url, {
          headers: {
            referer: 'https://m.wowdsgn.com/',
            host: 'm.wowdsgn.com'
          }
        }).then((response) => {
          output = response.data
          axios.get(imgUrl, {
            headers: {
              Connection: 'Keep-Alive',
              Host: 'mobile-api.wowdsgn.com'
            }
          }).then((response) => {
            output.data1 = response.data
            res.json(output)
          }).catch((err) => {
            console.log(err)
          })
        }).catch((err) => {
          console.log(err)
        })
      })
      // 获取toPic页面数据先获取详细数据后是图片数据，组合后返回
      app.get('/api/toPic', (req, res) => {
        // res.json(recommend)
        console.log(req.query)
        var imgUrl = `https://mobile-api.wowdsgn.com/v3/topic?paramJson={%22topicId%22:${req.query.id}}`
        var url = `https://mobile-api.wowdsgn.com/v2/topic/product?paramJson={%22topicId%22:${req.query.id}}`
        var output = ''
        axios.get(url, {
          headers: {
            Connection: 'Keep-Alive',
            Host: 'mobile-api.wowdsgn.com'
          }
        }).then((response) => {
          output = response.data
          axios.get(imgUrl, {
            headers: {
              Connection: 'Keep-Alive',
              Host: 'mobile-api.wowdsgn.com'
            }
          }).then((response) => {
            output.data1 = response.data
            res.json(output)
          }).catch((err) => {
            console.log(err)
          })
        }).catch((err) => {
          console.log(err)
        })
      })
      // 获取产品详情数据整合后返回
      app.get('/api/productDetails', (req, res) => {
        // res.json(recommend)
        console.log(req.query)
        var mainUrl = `https://mobile-api.wowdsgn.com/v3/products/${req.query.id}`  //  主要数据
        var imgUrl = `https://mobile-api.wowdsgn.com/v1/products/${req.query.id}/detail`  //  图片详情
        var comment = `https://mobile-api.wowdsgn.com/v1/product/comments/list?paramJson={%22productId%22:${req.query.id},%22currentPage%22:1,%22pageSize%22:4}`  //  评论信息
        var cartDetail = `https://mobile-api.wowdsgn.com/v2/product/spec?paramJson={%22productId%22:${req.query.id}}`
        var recommend = `https://mobile-api.wowdsgn.com/v2/products/${req.query.id}/related`  //  相关推荐大家都在看
        var output = {}
        var Code = 1 //  成功失败码
        axios.get(mainUrl, {
          headers: {
            Connection: 'Keep-Alive',
            Host: 'mobile-api.wowdsgn.com'
          }
        }).then((response) => {
          if (response.data.resCode === '0') {
            Code = 0
            output.mainMsg = response.data.data
          }
          axios.get(imgUrl, {
            headers: {
              Connection: 'Keep-Alive',
              Host: 'mobile-api.wowdsgn.com'
            }
          }).then((response) => {
            if (response.data.resCode === '0') {
              Code = 0
              output.imageMsg = response.data.data
            }
            axios.get(comment, {
              headers: {
                Connection: 'Keep-Alive',
                Host: 'mobile-api.wowdsgn.com'
              }
            }).then((response) => {
              if (response.data.resCode === '0') {
                Code = 0
                output.commentMsg = response.data.data
              }
              axios.get(recommend, {
                headers: {
                  Connection: 'Keep-Alive',
                  Host: 'mobile-api.wowdsgn.com'
                }
              }).then((response) => {
                if (response.data.resCode === '0') {
                  Code = 0
                  output.recommendMsg = response.data.data
                }
                axios.get(cartDetail, {
                  headers: {
                    Connection: 'Keep-Alive',
                    Host: 'mobile-api.wowdsgn.com'
                  }
                }).then((response) => {
                  if (response.data.resCode === '0') {
                    Code = 0
                    output.cartDetail = response.data.data
                  }
                  output.resCode = Code
                  res.json(output)
                }).catch((err) => {
                  Code = 1
                  console.log(err)
                })
              }).catch((err) => {
                Code = 1
                console.log(err)
              })
            }).catch((err) => {
              Code = 1
              console.log(err)
            })
          }).catch((err) => {
            Code = 1
            console.log(err)
          })
        }).catch((err) => {
          Code = 1
          console.log(err)
        })
      })
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${config.dev.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
          ? utils.createNotifierCallback()
          : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
