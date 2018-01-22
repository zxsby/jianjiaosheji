<template>
  <transition >
    <div class="index-content">
      <div class="index-header">
        <router-link to="/index/recommend" tag="div" class="header-wrapper">
          <span  class="item">推荐</span>
        </router-link>
        <router-link to="/index/furniture" tag="div" class="header-wrapper">
          <span class="item">家具</span>
        </router-link>
        <router-link to="/index/home" tag="div" class="header-wrapper">
          <span class="item">家居</span>
        </router-link>
        <router-link to="/index/activity" tag="div" class="header-wrapper">
          <span class="item">活动</span>
        </router-link>
      </div>
      <transition  name="fold" mode="out-in">
      <router-view></router-view>
      </transition>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .fold-enter-active, .fold-leave-active
    transition: all 0.5s linear
    transform: translate3d(0%, 0, 0)
  .fold-enter
    transition: all 0s linear
    transform: translate3d(100%, 0, 0)
    opacity : 0
  .fold-leave-to
    transition: all 0.5s linear
    transform: translate3d(-100%, 0, 0)
    opacity : 0
  .index-content
    .index-header
      display:flex
      height: 40px
      width: 100%
      .header-wrapper
        flex: 1
        box-sizing:border-box
        text-align:center
        font-size: 0
        &.router-link-active
          .item
            border-bottom: 2px solid  #2a2a2a
        .item
          font-size: 12px
          padding: 10px
          line-height: 40px
          color: #2a2a2a


</style>
