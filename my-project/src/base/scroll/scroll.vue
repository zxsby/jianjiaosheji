<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  export default {
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      pullUpLoad: {
        type: Number,
        threshold: 50
      },
      // 显示滚动条
      fade: {
        type: Boolean,
        default: true
      },
      //  是否可交互
      interactive: {
        type: Boolean,
        default: false
      },
      //  鼠标抬起
      touch: {
        type: Boolean,
        default: false
      },
      data: {
        type: Array,
        default: null
      }
    },
    mounted () {
//      setTimeout(() => {
//        this.$nextTick(() => {
//          this._initScroll()
//        })
//      }, 20)
    },
    methods: {
      _initScroll () {
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click,
          pullUpLoad: {
            threshold: 50
          },
          scrollbar: {
            fade: this.fade,
            interactive: this.interactive
          }
        })
        //  监听实时滚动事件
        if (this.listenScroll) {
          let me = this
          this.scroll.on('scroll', (pos) => {
            me.$emit('scroll', pos)
          })
        }
        //  监听抬起事件
        if (!this.touch) {
          this.scroll.on('touchEnd', (pos) => {
            if (pos.y > 50) {
              this.$emit('touchEnd', pos)
            }
          })
        }
      },
      enable () {
        this.scroll && this.scroll.enable()
      },
      disable () {
        this.scroll && this.scroll.disable()
      },
      refresh () {
        this.scroll && this.scroll.refresh()
      },
      scrollToTop () {
        this.scroll.scrollTo(0, 0, 1000)
      }
    },
    watch: {
      data () {
        setTimeout(() => {
          if (!this.refsh) {
            this._initScroll()
            this.refsh = true
          } else {
            this.refresh()
          }
        }, 20)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
