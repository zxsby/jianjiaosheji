import {mapGetters, mapActions} from 'vuex'

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

export const goTOProductGroup = {
  methods: {
    // 跳转到 productGroup 或者 toPic
    goTOProductGroup (bannerLinkTargetId, bannerLinkType) {
      console.log(bannerLinkTargetId, bannerLinkType)
      if (!bannerLinkTargetId) {
        return
      }
      if (bannerLinkType === 10) {
        this.$router.push(`/productGroup/${bannerLinkTargetId}`)
      }
      if (bannerLinkType === 8) {
        this.$router.push(`/toPic/${bannerLinkTargetId}`)
      }
    }
  }
}

// 跳转到详情
export const goToDetail = {
  methods: {
    goToDetail (productId) {
      this.$router.push(`/productDetails/${productId}`)
    }
  }
}

//  商品收藏
export const productCollect = {
  computed: {
    ...mapGetters([
      'getCart',
      'getProductCollect'
    ])
  },
  methods: {
    // 验证是否收藏
    checkedProductCollect (detail) {
      let index = this.getProductCollect.findIndex((item) => {
        return item.productId === detail.productId
      })
      if (index >= 0) {
        return 'red'
      } else {
        return 'black'
      }
    },
    //  添加商品收藏
    joinProductCollect (detail) {
      this.joinPcl(detail)
    },
    ...mapActions([
      'joinPcl'
    ])
  }
}

// 获取购物车数据

export const getCartList = {
  computed: {
    ...mapGetters([
      'getCart'
    ])
  },
  methods: {
    ...mapActions([
      'changeCartDetailCount',
      'detailCartItem'
    ])
  }
}
