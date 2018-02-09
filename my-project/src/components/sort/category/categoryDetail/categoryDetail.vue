<template>
  <div class="categoryDetail-content" v-if="headerMsg.id">
    <toTop top="110px" @scrolltoTop="scrollTOTOP" ref="totop"></toTop>
    <div class="content-header">
      <p @click="goToBack" class="header-left"> <</p>
      {{headerMsg.name}}
      <p @click="goToCart" class="iconfont icon-gouwuche">
        <i class="count-num" v-show="getCart.length > 0">{{getCart.length}}</i>
      </p>
    </div>
    <Scroll @scrollToEnd="scrollToEnd" @scroll="scroll" v-if="headerMsg.background" :pullup="true"
            :interactive="true" class="main-content" :probeType="2"
            :listenScroll="true" :data="productLists" ref="scrolls">
      <div>
        <div ref="list" class="next-header" :style="{backgroundImage: `url(${headerMsg.background})`}">
          <ul ref="wrapper" class="next-header-content">
            <li @click="changeId(headerMsg.id)" class=" item-all" :class="{'item-active': searchId === headerMsg.id}">
              <img width="40" height="40" :src="headerMsg.icon" alt="">
              <p>All</p>
            </li>
            <li :class="{'item-active': searchId === item.id}" @click="changeId(item.id)" class="next-header-item"
                v-for="item in headerMsg.categories">
              <p class="item-text">{{item.categoryName}}</p>
            </li>
          </ul>
        </div>
        <div ref="fenlei" class="search-list">
          <div class="list-header">
            <div class="header-text" @click="activeTimeSort" :class="{'active': active === 1}">上新</div>
            <div class="header-text" @click="activeCountSort" :class="{'active': active === 2}">销量</div>
            <div class="header-text" @click="activePriceSort" :class="{'active': active === 3}">价格
              <div class="sort-content">
                <img class="sort" :class="{'sort-active' : sortActive}" src="./up.png" alt="">
                <img class="sort" :class="{'sort-active' : !sortActive}" src="./down.png" alt="">
              </div>
            </div>
          </div>
        </div>
        <productList @imageLoad="imageLoad" v-if="productLists.data" v-show="productLists.data.products.length > 0"
                     :showMore="showMore"
                     :productLists="productLists"></productList>
      </div>
    </Scroll>
    <div v-show="productLists.data" @click="showScreen" class="screen">!!!</div>
    <Screen @subScreen="subScreen" ref="screen" :screen="screen"></Screen>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import productList from '../../../../base/productList/productList.vue'
  import Screen from '../../../../base/screen/screen.vue'
  import toTop from '../../../../base/toTop/toTop.vue'
  import Scroll from '../../../../base/scroll/scroll.vue'
  import {loadImage} from '../../../../common/js/mixin'
  import {mapGetters} from 'vuex'
  export default {
    mixins: [loadImage],
    props: {
      id: {
        type: String
      }
    },
    data () {
      return {
        headerMsg: {},
        searchId: this.id,
        active: 1,   //  list-header选中状态
        sortActive: true,  // 排序
        showMore: true,
        screen: {}, // 筛选数据
        order: 'asc', // 升降续
        sort: 'onShelfTime', //  排序类型
        colorIds: [],   //  颜色筛选
        sceneIds: [],   //  场景的筛选
        styleIds: [],   //  风格的筛选
        productLists: {}
      }
    },
    created () {
      this._categoryDetail()
      this.submitSearch()
      this.getsaixuan()
    },
    mounted () {
    },
    computed: {
      ...mapGetters([
        'getCart'
      ])
    },
    methods: {
      _categoryDetail () {
        // 获取头部数据
        this.$http.get('/api/scot/categoryDetail', {
          params: {
            id: this.id
          }
        }).then((result) => {
          if (result.status === 200) {
            this.headerMsg = result.data
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      // 获取筛选数据
      getsaixuan () {
        this.$http.get('./api/saixuan').then((result) => {
          this.screen = result.data.data
        }).catch((err) => {
          console.log(err)
        })
      },
      // 提交搜索
      submitSearch () {
        this.$http.get('./api/sort/categoryDetailBody', {
          params: {
            id: this.searchId,
            currentPage: 1,
            order: this.order,
            sort: this.sort,
            colorIds: this.colorIds.toString(),
            sceneIds: this.sceneIds.toString(),
            styleIds: this.styleIds.toString()
          }
        }).then((result) => {
          this.productLists = result.data
        }).catch((err) => {
          console.log(err)
        })
      },
      // 点击上新时间
      activeTimeSort () {
        this.active = 1
        this.order = 'asc'
        this.sort = 'onShelfTime'
        this.productLists = {}
        this.submitSearch()
        this.scrollTOTOP()
      },
      // 点击销量
      activeCountSort () {
        this.active = 2
        this.order = 'asc'
        this.sort = 'sales'
        this.productLists = {}
        this.submitSearch()
        this.scrollTOTOP()
      },
      //  点击价格排序
      activePriceSort () {
        if (this.active === 3) {
          this.sortActive = !this.sortActive
          if (!this.sortActive) {
            this.order = 'desc'
            this.sort = 'price'
            this.productLists = {}
            this.submitSearch()
            this.scrollTOTOP()
          } else {
            this.order = 'asc'
            this.sort = 'price'
            this.productLists = {}
            this.submitSearch()
            this.scrollTOTOP()
          }
        } else {
          this.sortActive = true
          this.active = 3
          this.order = 'asc'
          this.sort = 'price'
          this.productLists = {}
          this.submitSearch()
          this.scrollTOTOP()
        }
      },
      // 修改搜索id
      changeId (id) {
        this.searchId = id
        this.submitSearch()
      },
      // 显示筛选
      showScreen () {
        this.$refs.screen.show()
      },
      //  获取提交筛选信息
      subScreen (colorIds, sceneIds, styleIds) {
        this.styleIds = styleIds
        this.colorIds = colorIds
        this.sceneIds = sceneIds
        this.submitSearch()
        this.scrollTOTOP()
      },
      imageLoad () {
        this.$refs.scrolls.refresh()
      },
      scroll (el) {
        el.y < -1000 ? this.$refs.totop.toTop = true : this.$refs.totop.toTop = false
        el.y < -100 ? this._changePosition(this.$refs.fenlei.style, el.y) : this._clearPosition(this.$refs.fenlei.style)
      },
      //  下拉加载更多
      scrollToEnd () {
        if (this.productLists.data.pageSize * this.productLists.data.currentPage === this.productLists.data.products.length) {
          this.$http.get('./api/sort/categoryDetailBody', {
            params: {
              id: this.searchId,
              currentPage: this.productLists.data.currentPage + 1,
              order: this.order,
              sort: this.sort,
              colorIds: this.colorIds.toString(),
              sceneIds: this.sceneIds.toString(),
              styleIds: this.styleIds.toString()
            }
          }).then((result) => {
            if (result.data.resCode === '0') {
              if (result.data.data.products) {
                this.productLists.data.currentPage = result.data.data.currentPage
                this.productLists.data.products = this.productLists.data.products.concat(result.data.data.products)
                this.showMore = true
              } else {
                this.showMore = false
              }
            }
          }).catch((err) => {
            console.log(err)
          })
        } else {
          this.showMore = false
        }
      },
      //  返回上一页
      goToBack () {
        this.$router.back(-1)
      },
      goToCart () {
        this.$router.push('/cart')
      },
      _changePosition (e, y) {
        e.position = 'fixed'
        e.top = `${Math.abs(y)}px`
        e.left = 0
        e.right = 0
        e.zIndex = 11111
      },
      _clearPosition (e) {
        e.position = ''
        e.top = ''
        e.left = ''
        e.right = ''
      },
      //  跳转到顶部
      scrollTOTOP () {
        this.$refs.scrolls.scrollToTop()
        this.$refs.totop.toTop = false
      }
    },
    watch: {
      headerMsg () {
        if (this.scrollX) {
          this.scroll.refresh()
        } else {
          if (this.headerMsg.categories) {
            setTimeout(() => {
              let listWidth = 82
              let margin = 10
              let width = (listWidth + (2 * margin)) * (this.headerMsg.categories.length + 1)
              this.$refs.wrapper.style.width = width + 25 + 'px'
              this.scrollX = new BScroll(this.$refs.list, {
                click: true,
                scrollX: true,
                eventPassthrough: 'vertical'
              })
            }, 20)
          }
        }
      }
    },
    components: {
      Screen,
      productList,
      Scroll,
      toTop
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .categoryDetail-content
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 1111
    background: white
    .content-header
      height: 50px
      line-height: 50px
      text-align: center
      font-size: 18px
      font-weight: 550
      .iconfont
        float: right
        font-size: 25px
        font-weight: 100
        margin-right: 10px
        &.icon-gouwuche
          position: relative
          .count-num
            position: absolute
            top: 3px
            right: -2px
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
      .header-left
        float: left
        font-size: 24px
        padding: 0 10px
        font-weight: 700

    .main-content
      position: fixed
      top: 50px
      left: 0
      right: 0
      bottom: 0
      overflow: hidden
      .next-header
        width: 100%
        height: 84px
        padding: 13px 7px
        overflow: hidden
        background-size: 100% 100%
        .next-header-content
          .next-header-item
            margin: 0 10px
            float: left
            display: flex
            align-items: center
            vertical-align: middle
            width: 80px
            height: 80px
            border: 1px solid rgba(255, 255, 255, 1)
            &.item-active
              background: rgba(255, 255, 255, 0.2)
            .item-text
              display: flex
              align-items: center
              margin: 0 auto
              text-align: center
              padding: 0 6px
              color: white
              font-size: 14px
              font-weight: 550
          .item-all
            margin: 0 10px
            float: left
            width: 80px
            height: 80px
            text-align: center
            border: 1px solid rgba(255, 255, 255, 1)
            color: white
            font-weight: 550
            &.item-active
              background: rgba(255, 255, 255, 0.2)
            img
              padding: 6px 0 0 0
      .search-list
        height: 45px
        text-align: center
        .list-header
          height: 45px
          display: flex
          color: #808080
          font-size: 15px
          background: white
          .header-text
            flex-direction: column
            flex: 1
            padding: 10px 0
            margin: 0 30px
            .sort-content
              height: 45px
              vertical-align: text-top
              display: inline-block
              margin-top: 4px
              .sort
                display: block
                width: 10px
                opacity: .5
          .header-text
            &.active
              font-weight: 700
              color: black
              border-bottom: 2px solid black
              .sort-content
                .sort-active
                  opacity: 1

    .screen
      position: fixed
      right: 40px
      bottom: 50px
      width: 40px
      height: 40px
      border-radius: 50%
      background: #d1cdcd
      font-size: 22px
      line-height: 38px
      text-align: center
      font-weight: 700
      transform: rotate(90deg)
</style>
