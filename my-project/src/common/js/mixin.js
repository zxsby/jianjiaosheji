export const computedPrice = {
  filters: {
    // 货币转换过滤器
    money: function (number) {
      var places = 0
      number = number || 0
      places = !isNaN(places = Math.abs(places)) ? places : 2
      var negative = number < 0 ? '-' : ''
      var i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + ''
      var j = i.length
      j = j > 3 ? j % 3 : 0
      return negative + (j ? i.substr(0, j) + ',' : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + ',') + (places ? '.' + Math.abs(number - i).toFixed(places).slice(2) : '') + '.00'
    }
  }
}

export const loadImage = {
  methods: {
    // 录播图片加载完成后 refresh
    loadImage () {
      if (!this.checkLoaded) {
        this.$refs.scroll.refresh()
        this.checkLoaded = true
      }
    },
    // 推荐图片后 refresh
    imageLoad () {
      this.$refs.scroll.refresh()
    },
    // 监听滚动事件
    scroll (el) {
      el.y < -1000 ? this.$refs.totop.toTop = true : this.$refs.totop.toTop = false
    },
    //  跳转到顶部
    scrollTOTOP () {
      this.$refs.scroll.scrollToTop()
      this.$refs.totop.toTop = false
    },
    //  鼠标抬起事件 实现上拉刷新
    touchEnd (el) {
      console.log(el)
    }
  }
}
