<template>
  <transition>
  <div class="sort-content">
    <div class="sort-header">
      <router-link to="/sort/category" tag="div" class="header-wrapper">
        <span class="item">品类</span>
      </router-link>
      <router-link to="/sort/brand" tag="div" class="header-wrapper">
        <span class="item">品牌</span>
      </router-link>
      <router-link to="/sort/stylist" tag="div" class="header-wrapper">
        <span class="item">设计师</span>
      </router-link>
    </div>
    <div class="sort-wrapper">
      <router-view></router-view>
    </div>
  </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .sort-content
    .sort-header
      display: flex
      height: 40px
      width: 100%
      .header-wrapper
        flex: 1
        box-sizing: border-box
        text-align: center
        font-size: 0
        &.router-link-active
          .item
            border-bottom: 2px solid #2a2a2a
        .item
          font-size: 12px
          padding: 10px
          line-height: 40px
          color: #2a2a2a
    .sort-wrapper
      position: fixed
      top: 84px
      right: 0
      left: 0
      bottom: 50px
      overflow: hidden
</style>
