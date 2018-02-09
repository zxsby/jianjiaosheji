<template>
  <div class="category-content">
    <Scroll v-if="categoryLists.length" :interactive="true" class="main-content"
            :probeType="2"
            :data="categoryLists" ref="scroll">
      <div class="category-wrapper">
        <div class="item-wrapper" v-for="(item,index) in categoryLists">
          <img @load="imageLoad" @click="showList(index)" class="item-image" :src="item.moduleContent.background"
               alt="">
          <transition name="sold">
            <div v-show="showIndex === index" class="text-list">
              <p @click="goToCategoryDetail(list.bannerLinkTargetId, index)" class="text" v-for="(list,index) in item.moduleContent.banners">
                <span class="text-left">{{list.bannerTitle}}</span>
                <span class="text-right">></span>
              </p>
            </div>
          </transition>
        </div>
      </div>
    </Scroll>
    <div v-show="!categoryLists.length" class="loading">
      <Loading></Loading>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from '../../../base/scroll/scroll.vue'
  import Loading from '../../../base/loading/loading.vue'
  export default {
    data () {
      return {
        categoryLists: [],
        showIndex: -1
      }
    },
    created() {
      this._getCategory()
    },
    methods: {
      _getCategory () {
        this.$http.get('./api/sort/category').then((result) => {
          if (result.data.resCode === '0') {
            this.categoryLists = result.data.data.modules
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      //  显示对应列表
      showList (index) {
        if (this.showIndex === index) {
          this.showIndex = -1
        } else {
          this.showIndex = index
        }
      },
      //  详情页
      goToCategoryDetail (id) {
        this.$router.push(`/categoryDetail/${id}`)
      },
      imageLoad () {
        this.$refs.scroll.refresh()
      }
    },
    components: {
      Scroll,
      Loading
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .category-content
    .main-content
      position: fixed
      top: 84px
      right: 0
      left: 0
      bottom: 50px
      overflow: hidden
      .category-wrapper
        padding: 0 20px
        .item-wrapper
          margin: 15px 0
          .item-image
            width: 100%
          .text-list
            &.sold-enter-active, &.sold-leave-active
              transition: all .3s ease
            &.sold-enter, &.sold-leave-to
              opacity: 0
            .text
              padding: 0 10px
              height: 50px
              line-height: 50px
              font-size: 18px
              border-bottom: 1px solid #eaeaea
              .text-left
                font-weight: 550
              .text-right
                float: right
    .loading
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
