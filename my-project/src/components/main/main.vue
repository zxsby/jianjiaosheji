<template>
  <div class="main-wrapper">
    <Hd :title="title"></Hd>
    <div class="main-content">
      <transition name="fold" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <div class="footer">
      <router-link @click.native="jump('index')" to="/index/recommend" replace class="footer-tab" tag="div">
        <i class="iconfont icon-icon-"></i>
        <p>首页</p>
      </router-link>
      <router-link @click.native="jump('sort')" to="/sort" replace class="footer-tab" tag="div">
        <i class="iconfont icon-fenlei"></i>
        <p>分类</p>
      </router-link>
      <router-link @click.native="jump('inspiration')" to="/inspiration" replace class="footer-tab" tag="div">
        <i class="iconfont icon-wendangdocument85"></i>
        <p>灵感</p>
      </router-link>
      <router-link @click.native="jump('brand')" to="/brand" replace class="footer-tab" tag="div">
        <i class="iconfont icon-pinpai"></i>
        <p>品牌</p>
      </router-link>
      <router-link @click.native="jump('user')" to="/user" replace class="footer-tab" tag="div">
        <i class="iconfont icon-wo"></i>
        <p>我</p>
      </router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Head from 'base/header/header'
  export default{
    data () {
      return {
        title: '尖叫设计'
      }
    },
    methods: {
      jump (url) {
        url === 'index' ? this.title = '尖叫设计' : url === 'sort' ? this.title = '全部分类' : url === 'inspiration' ? this.title = '灵感' : url === 'brand' ? this.title = '品牌' : this.title = '我'
      }
    },
    components: {
      'Hd': Head
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .fold-enter-active, .fold-leave-active
    transition: all 0.4s linear
    transform: translate3d(0%, 0, 0)

  .fold-enter
    transition: all 0s linear
    transform: translate3d(100%, 0, 0)
    opacity: 0

  .fold-leave-to
    transition: all 0.4s linear
    transform: translate3d(-100%, 0, 0)
    opacity: 0

  .main-wrapper
    .main-content
      position: relative
      z-index:1
    /*.wrapper*/
    /*position: fixed*/
    /*top: 84px*/
    /*right: 0*/
    /*left: 0*/
    /*bottom: 50px*/
    .footer
      position: fixed
      left: 0
      bottom: 0
      right: 0
      display: flex
      font-size: 0
      height: 50px
      text-align: center
      border-top: 1px solid #f0f0f0
      .footer-tab
        flex: 1
        padding-top: 8px
        color: #7a7a7a
        &.router-link-active
          color: red
          font-weight: 700
        .iconfont
          display: inline-block
          font-size: 20px
          margin-bottom: 4px
        p
          font-size: 10px
          margin-top: 0
</style>
