<template>
  <transition name="top">
    <div v-show="toTop" class="toTop" :style="{'top': top}">
      <p @click="scrollTOTOP" class="goto" >返回顶部</p>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      top: {
        type: String,
        default: '90px'
      }
    },
    data () {
      return {
        toTop: false
      }
    },
    methods: {
      scrollTOTOP () {
        this.$emit('scrolltoTop')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .toTop
    position: fixed
    top: 90px
    left: 0
    right: 0
    z-index: 102
    &.top-enter-active, .top-leave-active
      transition: all 0.2s linear
      transform: translate3d(0%, 0, 0)
    &.top-enter
      transition: all 0.2s linear
      transform: translate3d(0, -100%, 0)
      opacity: 0
    &.top-leave-to
      transition: all 0.2s linear
      transform: translate3d(0, -100%, 0)
      opacity: 0
    .goto
      text-align: center
      margin: 0 auto
      width: 80px
      height: 22px
      background: rgba(0, 0, 0, 0.7)
      color: white
      font-size: 12px
      line-height: 22px
      border-radius: 10px
</style>
