<template>
  <div class="header-content">
    <i class="iconfont icon-sousuo"></i>
    <span>{{title}}</span>
    <i class="iconfont icon-gouwuche"></i>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .header-content
    position: relative
    height: 44px
    line-height: 44px
    text-align: center
    color: #231815
    span
      display: inline-block
      vertical-align: top
      font-weight: 600
      font-size: 17px
    .iconfont
      display: inline-block
      vertical-align: middle
      font-size: 19px
    .icon-sousuo
      position: absolute
      padding: 12px
      top: 0px
      left: 0px
    .icon-gouwuche
      position: absolute
      padding: 12px
      top: 0px
      right: 0px

</style>
