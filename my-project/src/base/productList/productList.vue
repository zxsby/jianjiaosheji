<template>
  <transition name="slide">
    <div v-if="productLists.data" class="productGroupList-wrapper">
      <div @click="goToDetail(item.productId)" class="productGroupList-detail"
           v-for="(item, index) in productLists.data.products"
           :class="{'right' : (index+1) % 2 === 0}">
        <div class="join-detail-hart">
          <i @click.stop="joinProductCollect(item)"
             :class="checkedProductCollect(item)" class="heart">♡</i>
        </div>
        <img @load="imageLoad" class="image" v-lazy="item.productImg" alt="">
        <p class="discount" :class="{'otherDiscount': item.signs[0].id===4 ? true : false}" v-if="item.signs">
          <span>{{item.signs[0].desc}}<i v-if="item.signs[0].id===2">折</i></span>
        </p>
        <p class="noDiscount" v-if="!item.signs"></p>
        <p class="name">{{item.productTitle}}</p>
        <p class="price">￥{{item.sellPrice | money}}<span
          v-if="item.sellPrice !== item.originalPrice">￥{{item.originalPrice | money}}</span></p>
        <p class="list-title">{{item.prizeOrSlogan}}</p>
      </div>
      <div v-show="showMore" class="productGroupList-loading">
        <Loading></Loading>
      </div>
      <div class="productGroupList-no" v-show="!showMore">没有更多了</div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  //  import Scroll from '../../base/scroll/scroll.vue'
  import Loading from '../../base/loading/loading.vue'
  //  import toTop from '../../base/toTop/toTop.vue'
  import {loadImage, computedPrice, goToDetail, productCollect} from '../../common/js/mixin'
  export default {
    mixins: [loadImage, computedPrice, goToDetail, productCollect],
    props: {
      productLists: {
        type: Object,
        default: {}
      },
      showMore: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      imageLoad () {
        this.$emit('loadImage')
      }
    },
    components: {
      Loading
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .productGroupList-wrapper
    width: 100%
    border-bottom: 1px solid #F5F5F5
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
    .productGroupList-loading
      height: 50px
      position: relative
    .productGroupList-no
      height: 50px
      padding: 10px
      line-height: 50px
      font-size: 16px
      color: black
      text-align: center
    .productGroupList-detail
      position: relative
      display: inline-block
      vertical-align: top
      width: 50%
      box-sizing: border-box
      border-top: 1px solid #F5F5F5
      .join-detail-hart
        position: absolute
        top: 10px
        right: 10px
        .heart
          font-size: 30px
          padding: 10px
          &.red
            color: red
          &.black
            color: black
      .image
        width: 100%
      .discount, .otherDiscount
        margin: 10px 15px 10px
        font-size: 12px
        color: white
        span
          padding: 2px 6px
          background: #FF7070
      .otherDiscount
        span
          padding: 2px 6px
          background: black
      .noDiscount
        height: 34px
      .name
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
        font-size: 14px
        padding: 0 15px 10px
      .price
        color: black
        font-size: 14px
        padding: 0 17px 10px
        span
          text-decoration: line-through
          font-size: 12px
          color: #ccc
      .list-title
        width: 100%
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
        font-size: 12px
        padding: 0 15px 15px
    .right
      border-left: 1px solid #F5F5F5
</style>
