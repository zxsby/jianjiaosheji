<template>
  <transition name="slide">
    <div class="searchPage">
      <toTop top="110px" @scrolltoTop="scrollTOTOP" ref="totop"></toTop>
      <div class="search-header">
        <div class="icon"><i class="iconfont icon-sousuo"></i></div>
        <div class="search-box">
          <input @keyup.enter="submitSearch" v-model="searchValue" placeholder="商品名、品牌、设计师、分类" class="put" type="text">
          <p @click="clearSearch" class="clear-search-box">x</p>
        </div>
        <div @click="goToBack" class="search-back">
          <span>取消</span>
        </div>
      </div>
      <div v-show="!searchList && hotArr.length" class="search-hot">
        <h1 class="hot-title">热门搜索</h1>
        <span @click="hotClick(item)" class="hot-text" v-for="item in hotArr">{{item}}</span>
      </div>
      <div v-show="!searchList && getSearchHistory.length" class="history-content">
        <p class="history-title">历史搜索
          <img @click="clearAllSearch" class="clear-all-history" width="15" height="15" src="./cleanSearch.png" alt="">
        </p>
        <span @click="hotClick(item)" class="hot-text" v-for="item in getSearchHistory">{{item}}
        <span @click.stop="detailOne(item)" class="clear-one">X</span>
      </span>
      </div>
      <div class="search-list" v-show="searchList">
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
      <Scroll @scroll="scroll" v-show="searchList" @scrollToEnd="scrollToEnd" v-if="productLists.data" :pullup="true"
              :interactive="true" class="main-content" :probeType="2"
              :listenScroll="true" :data="productLists" ref="scroll">
        <productList @imageLoad="imageLoad" v-show="productLists.data.products.length > 0" :showMore="showMore"
                     :productLists="productLists"></productList>
        <div v-show="productLists.data.products.length === 0" class="no-search">
          没有匹配数据
        </div>
      </Scroll>
      <div v-show="searchList" @click="showScreen" class="screen">!!!</div>
      <Screen @subScreen="subScreen" ref="screen" :screen="screen"></Screen>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapActions} from 'vuex'
  import productList from '../../base/productList/productList.vue'
  import Screen from '../../base/screen/screen.vue'
  import toTop from '../../base/toTop/toTop.vue'
  import Scroll from '../../base/scroll/scroll.vue'
  import {loadImage} from '../../common/js/mixin'
  const ERR_OK = '0'
  export default {
    mixins: [loadImage],
    data () {
      return {
        hotArr: [],
        productLists: {},
        searchValue: '',  //  搜索框值
        searchList: false, // 列表显示
        active: 1,   //  list-header选中状态
        sortActive: true,  // 排序
        showMore: true,
        screen: {}, // 筛选数据
        order: 'asc', // 升降续
        sort: 'onShelfTime', //  排序类型
        colorIds: [],   //  颜色筛选
        sceneIds: [],   //  场景的筛选
        styleIds: []   //  风格的筛选
      }
    },
    computed: {
      ...mapGetters([
        'getSearchHistory'
      ])
    },
    created () {
      this._getHot()
    },
    methods: {
      //  获取热门搜索数据
      _getHot () {
        this.$http.get('./api/hot').then((result) => {
          if (result.data.data.resCode === ERR_OK) {
            this.hotArr = result.data.data.data.keywords
            this.screen = result.data.data1.data
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      // 热门搜索数据点击
      hotClick (val) {
        this.searchValue = val
        this.joinSearchHistory(this.searchValue)
        this.submitSearch()
      },
      // 删除单个热门搜索
      detailOne (val) {
        this.detailOneSearchHistory(val)
      },
      // 提交搜索
      submitSearch () {
        this.searchList = true
        this.joinSearchHistory(this.searchValue)
        this.$http.get('./api/search', {
          params: {
            txt: `"${this.searchValue}"`,
            currentPage: 1,
            order: `"${this.order}"`,
            sort: `"${this.sort}"`,
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
      },
      // 点击销量
      activeCountSort () {
        this.active = 2
        this.order = 'asc'
        this.sort = 'sales'
        this.productLists = {}
        this.submitSearch()
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
          } else {
            this.order = 'asc'
            this.sort = 'price'
            this.productLists = {}
            this.submitSearch()
          }
        } else {
          this.sortActive = true
          this.active = 3
          this.order = 'asc'
          this.sort = 'price'
          this.productLists = {}
          this.submitSearch()
        }
      },
      //  下拉加载更多
      scrollToEnd () {
        if (this.productLists.data.pageSize * this.productLists.data.currentPage === this.productLists.data.products.length) {
          this.$http.get('./api/search', {
            params: {
              txt: `"${this.searchValue}"`,
              currentPage: this.productLists.data.currentPage + 1,
              order: `"${this.order}"`,
              sort: `"${this.sort}"`,
              colorIds: this.colorIds,
              sceneIds: this.sceneIds,
              styleIds: this.styleIds
            }
          }).then((result) => {
            if (result.data.resCode === ERR_OK) {
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
      //  清空文本框数据并隐藏list列表
      clearSearch () {
        this.searchValue = ''
        this.searchList = false
      },
      //  清空所有搜索历史记录
      clearAllSearch () {
        this.clearAllSearchHistory()
      },
      //  返回上一页
      goToBack () {
        this.$router.back(-1)
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
      },
      ...mapActions([
        'joinSearchHistory',
        'detailOneSearchHistory',
        'clearAllSearchHistory'
      ])
    },
    watch: {
      // 监测搜索框中的值变化
      searchValue(val) {
        if (!val) {
          this.searchList = false
        }
      }
    },
    components: {
      productList,
      Scroll,
      toTop,
      Screen
    }
  }
</script>


<style lang="stylus" rel="stylesheet/stylus">
  .searchPage
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
    .search-header
      height: 50px
      line-height: 50px
      width: 100%
      border-bottom: 1px solid #f5f5f5
      .icon
        width: 13%
        display: inline-block
        text-align: center
        vertical-align: middle
        .iconfont
          font-size: 26px
      .search-box
        position: relative
        display: inline-block
        width: 70%
        .put
          width: 100%
          outline: none
          caret-color: yellow
        .clear-search-box
          position: absolute
          top: 18px
          right: 0
          width: 13px
          height: 13px
          border-radius: 50%
          text-align: center
          line-height: 10px
          background: #F5F5F5
          color: white
      .search-back
        display: inline-block
        text-align: center
        font-size: 14px
        width: 13%
    .search-list
      height: 45px
      text-align: center
      .list-header
        height: 45px
        display: flex
        color: #808080
        font-size: 15px
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
    .search-hot
      padding: 30px 15px
      .hot-title
        font-size: 12px
        color: #808080
      .hot-text
        font-size: 14px
        color: black
        display: inline-block
        margin: 10px 20px 10px 0
        padding: 5px 10px
        background: #F5F5F5
    .history-content
      padding: 0 15px
      .history-title
        font-size: 12px
        color: #808080
      .clear-all-history
        float: right
      .hot-text
        font-size: 14px
        color: black
        display: inline-block
        margin: 10px 15px 10px 0
        padding: 5px 7px 5px 8px
        background: #F5F5F5
        .clear-one
          display: inline-block
          width: 14px
          height: 14px
          margin-left: 5px
          line-height: 14px
          font-size: 12px
          border-radius: 50%
          text-align: center
          background: black
          color: #f5f4cc
    .main-content
      position: absolute
      top: 97px
      left: 0
      right: 0
      bottom: 0
      overflow: hidden
    .screen
      position: fixed
      right: 40px
      bottom: 50px
      width: 40px
      height: 40px
      border-radius: 50%
      background: #a09e9e
      font-size: 22px
      line-height: 38px
      text-align: center
      font-weight: 700
      transform: rotate(90deg)
</style>
