<template>
  <div class="header-content">
    <i @click="goToSearch" class="iconfont icon-sousuo"></i>
    <span>{{title}}</span>
    <i @click="goToCart" class="iconfont icon-gouwuche">
      <i class="count-num" v-show="getCart.length > 0">{{getCart.length}}</i>
    </i>
  </div>
</template>

<script type="text/ecmascript-6">
  import {productCollect} from '../../common/js/mixin'
  export default {
    mixins: [productCollect],
    props: {
      title: {
        type: String
      }
    },
    methods: {
      goToCart () {
        this.$router.push('/cart')
      },
      goToSearch () {
        this.$router.push('/search')
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
      top: 0
      left: 0
      font-size: 24px
    .icon-gouwuche
      position: absolute
      padding: 12px
      top: 0
      right: 0
      font-size: 24px
      .count-num
        position: absolute
        top: 12px
        right: 8px
        width: 15px
        height: 15px
        line-height: 15px
        text-align: center
        border-radius: 50%
        font-size: 6px
        font-weight: 700
        color: #000
        background: #FFD444
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .4)

</style>
