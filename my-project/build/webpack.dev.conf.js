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
